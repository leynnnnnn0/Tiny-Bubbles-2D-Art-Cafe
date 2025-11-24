<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(), 
            ]
        );

        $business = $user->business()->firstOrCreate(
            ['name' => 'Test Business'],
            [
                'address' => '123 Main St, City, Country',
                'contact_email' => 'business@gamila.com',
                'contact_phone' => '123-456-7890',
            ]);

            $business->qr_code()->firstOrCreate([
                'heading' => 'Taylora',
                'subheading' => 'Join our loyalty program!',
                'background_color' => '#FFFFFF',
                'text_color' => '#000000',
                'background_image' => null,
                'logo' => null,
            ]);

    }
}
