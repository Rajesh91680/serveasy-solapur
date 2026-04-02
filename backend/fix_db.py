
from django.db import connection

def run():
    with connection.cursor() as cursor:
        try:
            cursor.execute("ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'customer';")
            print("Successfully added 'role' column to 'users' table.")
        except Exception as e:
            print(f"Error adding 'role' column: {e}")

if __name__ == "__main__":
    import os
    import django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'serveasy_project.settings')
    django.setup()
    run()
