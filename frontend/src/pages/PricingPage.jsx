import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const PricingPage = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        { name: '5 Articles per month', included: true },
        { name: '5 Blog posts per month', included: true },
        { name: '10 Images per month', included: true },
        { name: '10 Thumbnails per month', included: true },
        { name: 'Basic support', included: true },
        { name: 'Priority support', included: false },
        { name: 'Advanced AI models', included: false },
        { name: 'API access', included: false },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professionals and businesses',
      features: [
        { name: 'Unlimited Articles', included: true },
        { name: 'Unlimited Blog posts', included: true },
        { name: 'Unlimited Images', included: true },
        { name: 'Unlimited Thumbnails', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced AI models', included: true },
        { name: 'API access', included: true },
        { name: 'Custom templates', included: true },
      ],
      cta: 'Start Pro Trial',
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for you. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular ? 'border-2 border-blue-600 shadow-xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="text-green-600 mt-1 mr-3 flex-shrink-0" size={20} />
                      ) : (
                        <X className="text-gray-400 mt-1 mr-3 flex-shrink-0" size={20} />
                      )}
                      <span
                        className={
                          feature.included ? 'text-gray-900' : 'text-gray-400 line-through'
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button
                    fullWidth
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Feature Comparison</h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-blue-50">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">Articles per month</td>
                  <td className="text-center py-4 px-6 text-gray-700">5</td>
                  <td className="text-center py-4 px-6 bg-blue-50 font-medium">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">Blog posts per month</td>
                  <td className="text-center py-4 px-6 text-gray-700">5</td>
                  <td className="text-center py-4 px-6 bg-blue-50 font-medium">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">Images per month</td>
                  <td className="text-center py-4 px-6 text-gray-700">10</td>
                  <td className="text-center py-4 px-6 bg-blue-50 font-medium">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">Thumbnails per month</td>
                  <td className="text-center py-4 px-6 text-gray-700">10</td>
                  <td className="text-center py-4 px-6 bg-blue-50 font-medium">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">Support</td>
                  <td className="text-center py-4 px-6 text-gray-700">Basic</td>
                  <td className="text-center py-4 px-6 bg-blue-50 font-medium">Priority</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">Advanced AI models</td>
                  <td className="text-center py-4 px-6">
                    <X className="text-gray-400 mx-auto" size={20} />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="text-green-600 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">API access</td>
                  <td className="text-center py-4 px-6">
                    <X className="text-gray-400 mx-auto" size={20} />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="text-green-600 mx-auto" size={20} />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Custom templates</td>
                  <td className="text-center py-4 px-6">
                    <X className="text-gray-400 mx-auto" size={20} />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="text-green-600 mx-auto" size={20} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of creators using InspiroAI today
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
