# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development

# Expose the Flask port
EXPOSE 5000

# Run the Flask development server
CMD ["flask", "run"]
