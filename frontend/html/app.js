const BACKEND = 'http://localhost:5000';

async function checkHealth() {
    const statusEl = document.getElementById('status');
    const textEl = document.getElementById('status-text');
    try {
        const res = await fetch(`${BACKEND}/api/health`);
        if (res.ok) {
            statusEl.className = 'online';
            textEl.textContent = 'Backend online';
        } else {
            throw new Error();
        }
    } catch {
        statusEl.className = 'offline';
        textEl.textContent = 'Backend offline';
    }
}

function statusBadge(status) {
    if (!status) return `<span class="badge badge-default">—</span>`;
    const s = status.toLowerCase();
    if (s.includes('activ') || s.includes('done') || s.includes('complet') || s.includes('ok')) {
        return `<span class="badge badge-active">${status}</span>`;
    }
    return `<span class="badge badge-pending">${status}</span>`;
}

async function loadTeam() {
    const tbody = document.getElementById('team-table');
    try {
        const res = await fetch(`${BACKEND}/api/team`);
        if (!res.ok) throw new Error('Error al obtener datos del equipo');
        const members = await res.json();

        const features = new Set(members.map(m => m.feature).filter(Boolean));
        const services = new Set(members.map(m => m.servicio).filter(Boolean));

        document.getElementById('stat-total').textContent = members.length;
        document.getElementById('stat-features').textContent = features.size;
        document.getElementById('stat-services').textContent = services.size;

        const statsRow = document.getElementById('stats-row');
        statsRow.style.display = '';
        statsRow.removeAttribute('aria-hidden');

        tbody.innerHTML = members.map(m => `
      <tr>
        <td class="td-name">${m.name ?? '—'}</td>
        <td class="td-legajo">${m.legajo ?? '—'}</td>
        <td><span class="badge badge-feat">${m.feature ?? '—'}</span></td>
        <td>${m.servicio ?? '—'}</td>
        <td>${statusBadge(m.status)}</td>
      </tr>
    `).join('');
    } catch (err) {
        tbody.innerHTML = `<tr class="error-row"><td colspan="5">No se pudo cargar el equipo: ${err.message}</td></tr>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkHealth();
    loadTeam();
});
