# 1. Imagen base liviana de Python
FROM python:3.12-slim

# 2. Evitar que Python genere archivos .pyc y que el output salga directo a la consola
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Directorio de trabajo
WORKDIR /app

# 4. Instalar dependencias del sistema necesarias para healthchecks (curl)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 5. Instalar dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copiar el código del backend
COPY . .

# 7. SEGURIDAD: Crear un usuario que no sea root para correr la app
RUN useradd -m myuser
USER myuser

# 8. Puerto donde corre Flask
EXPOSE 5000

# 9. Healthcheck para que Docker sepa si el backend está sano
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# 10. Comando para arrancar la app con Gunicorn (más profesional que flask run)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
