<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $products = [
            [
                'name'        => 'Apple iPhone 14 Pro',
                'description' => 'Experience the next level of performance with the iPhone 14 Pro, featuring the A16 Bionic chip and ProMotion display.',
                'price'       => 119900.00, // ₹1,19,900
            ],
            [
                'name'        => 'Sony WH-1000XM5 Headphones',
                'description' => 'Industry-leading noise-canceling wireless headphones with crystal-clear audio and all-day battery life.',
                'price'       => 27490.00, // ₹27,490
            ],
            [
                'name'        => 'Dell XPS 13 Laptop',
                'description' => 'A compact and powerful laptop with a stunning 13.4-inch display and 12th Gen Intel processors.',
                'price'       => 182389.96, // ₹1,82,389.96
            ],
            [
                'name'        => 'Canon EOS R6 Camera',
                'description' => 'Mirrorless camera with a 20MP full-frame sensor, 4K video recording, and advanced autofocus.',
                'price'       => 211300.00, // ₹2,11,300
            ],
            [
                'name'        => 'Nike Air Max 270',
                'description' => 'Stylish and comfortable sneakers with Max Air cushioning for daily wear.',
                'price'       => 11196.00, // ₹11,196
            ],
            [
                'name'        => 'Logitech MX Master 3S Mouse',
                'description' => 'Advanced wireless mouse for productivity with ultra-fast scrolling and ergonomic design.',
                'price'       => 8299.00, // ₹8,299
            ],
            [
                'name'        => 'Instant Pot Duo 7-in-1',
                'description' => 'Electric pressure cooker with 7 functions in one, perfect for quick and easy meals.',
                'price'       => 9999.00, // ₹9,999
            ],
            [
                'name'        => 'Amazon Echo Dot (5th Gen)',
                'description' => 'Compact smart speaker with Alexa and improved sound quality.',
                'price'       => 5499.00, // ₹5,499
            ],
            [
                'name'        => 'GoPro HERO12 Black',
                'description' => 'Rugged 5.3K action camera with HyperSmooth stabilization and waterproof design.',
                'price'       => 29990.00, // ₹29,990
            ],
            [
                'name'        => 'Fitbit Versa 4 Smartwatch',
                'description' => 'Fitness smartwatch with GPS, heart rate tracking, and sleep monitoring.',
                'price'       => 15299.00, // ₹15,299
            ],
        ];

        $product = $this->faker->randomElement($products);

        return [
            'name'                         => $product['name'],
            'description'                  => $product['description'],
            'price'                        => $product['price'],
            'featured_image'               => $this->faker->imageUrl(),
            'featured_image_original_name' => $this->faker->word() . '.jpg',
            'created_at'                   => now(),
            'updated_at'                   => now(),
        ];
    }
}
