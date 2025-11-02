# Use slim Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend files
COPY . .

# Expose port (match app.py)
EXPOSE 8000

# Run Flask app
CMD ["python", "app.py"]
