FROM --platform=$BUILDPLATFORM python:3.8 AS builder

# Install necessary system packages
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code/
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate

CMD ["python", "manage.py", "runserver","0.0.0.0:8000"]
VOLUME .:/final-year-code/data
EXPOSE 8000
