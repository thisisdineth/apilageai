
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      monthlyPrice: 'Rs. 2,499',
      annualPrice: 'Rs. 24,990',
      annualSaving: 'Save Rs. 4,998',
      features: [
        'Basic Sinhala & Tamil support',
        'Up to 100 queries per day',
        'Standard response time',
        'Email support',
        'Single user access',
      ],
      notIncluded: [
        'Advanced language capabilities',
        'Custom model training',
      ]
    },
    {
      name: 'Professional',
      description: 'Ideal for businesses and organizations',
      monthlyPrice: 'Rs. 6,999',
      annualPrice: 'Rs. 69,990',
      annualSaving: 'Save Rs. 13,998',
      features: [
        'Advanced Sinhala & Tamil support',
        'Up to 1,000 queries per day',
        'Fast response time',
        'Priority email & chat support',
        'Up to 5 user access',
        'Basic custom training options',
      ],
      notIncluded: [
        'Enterprise-level scaling',
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large-scale deployment and customization',
      monthlyPrice: 'Rs. 14,999',
      annualPrice: 'Rs. 149,990',
      annualSaving: 'Save Rs. 29,998',
      features: [
        'Full multilingual capabilities',
        'Unlimited queries',
        'Fastest response time',
        '24/7 dedicated support',
        'Unlimited user access',
        'Advanced custom training',
        'Private model deployment',
        'SLA guarantees',
      ],
      notIncluded: [],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="chip mb-4">Pricing Plans</div>
          <h2 className="heading-lg">Choose the Right Plan for Your Needs</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options designed to scale with your requirements, from individual
            projects to enterprise-level deployments.
          </p>

          <div className="flex items-center justify-center mt-8">
            <div className="bg-muted rounded-full p-1 inline-flex">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isAnnual ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isAnnual ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'
                }`}
              >
                Annual
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden border transition-transform duration-300 hover:scale-105 ${
                plan.popular ? 'border-primary shadow-lg' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                
                <div className="mt-6">
                  <div className="flex items-end">
                    <span className="text-3xl font-bold">{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                    <span className="text-muted-foreground ml-2">{isAnnual ? '/year' : '/month'}</span>
                  </div>
                  {isAnnual && (
                    <p className="text-primary text-sm font-medium mt-1">{plan.annualSaving}</p>
                  )}
                </div>
                
                <div className="mt-6">
                  <a
                    href="#contact"
                    className={`w-full flex justify-center py-3 px-4 rounded-md transition-colors ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
                
                <div className="mt-6 space-y-4">
                  <p className="text-sm font-semibold">What's included:</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={16} className="mt-0.5 text-primary" />
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <p className="text-sm font-semibold mt-4">Not included:</p>
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <X size={16} className="mt-0.5 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Need a custom solution? <a href="#contact" className="text-primary font-medium hover:underline">Contact us</a> for specialized enterprise offerings.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
