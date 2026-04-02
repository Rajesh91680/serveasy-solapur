
from django.db import connection

def run():
    with connection.cursor() as cursor:
        # Create service_requests
        try:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS service_requests (
                    id BIGSERIAL PRIMARY KEY,
                    service_name VARCHAR(100) NOT NULL,
                    description TEXT NOT NULL,
                    date DATE NOT NULL,
                    time VARCHAR(50) NOT NULL,
                    status VARCHAR(20) NOT NULL DEFAULT 'requested',
                    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
                    provider_id BIGINT NOT NULL REFERENCES provider(id),
                    user_id BIGINT NOT NULL REFERENCES users(id)
                );
            """)
            print("Successfully created 'service_requests' table.")
        except Exception as e:
            print(f"Error creating 'service_requests': {e}")

        # Create service_reviews
        try:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS service_reviews (
                    id BIGSERIAL PRIMARY KEY,
                    rating INTEGER NOT NULL,
                    review_text TEXT,
                    work_photo VARCHAR(100),
                    status VARCHAR(20) NOT NULL DEFAULT 'pending',
                    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
                    provider_id BIGINT NOT NULL REFERENCES provider(id),
                    user_id BIGINT NOT NULL REFERENCES users(id)
                );
            """)
            print("Successfully created 'service_reviews' table.")
        except Exception as e:
            print(f"Error creating 'service_reviews': {e}")

if __name__ == "__main__":
    import os
    import django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'serveasy_project.settings')
    django.setup()
    run()
