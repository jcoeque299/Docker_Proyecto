sleep 10
php artisan migrate:refresh
php artisan db:seed --class="UsersTableSeeder"
php artisan serve --host=0.0.0.0 --port=8000
