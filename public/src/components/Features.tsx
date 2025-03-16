
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageSquare, Layers, Shield, Zap, Users } from 'lucide-react';

const featuresList = [
  {
    icon: <Globe className="w-10 h-10 text-primary" />,
    title: 'Multilingual Support',
    description: 'Fluent in Sinhala, Tamil, and English, tailored for Sri Lankan communication needs.'
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: 'Contextual Understanding',
    description: 'Understands local nuances, slang, and cultural references unique to Sri Lanka.'
  },
  {
    icon: <Layers className="w-10 h-10 text-primary" />,
    title: 'Versatile Applications',
    description: 'From business solutions to educational tools, adaptable across various sectors.'
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: 'Privacy Focused',
    description: 'Built with strong privacy protocols to protect sensitive user information.'
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: 'High Performance',
    description: 'Optimized for speed and efficiency, even with complex language processing tasks.'
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: 'Community Driven',
    description: 'Continuously improved with feedback from the Sri Lankan tech community.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="chip mb-4">Advanced Capabilities</div>
          <h2 className="heading-lg">Powerful Features Designed for Sri Lanka</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI model comes with a set of features specifically optimized for Sri Lankan users,
            businesses, and institutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              <div className="mb-4 p-3 rounded-lg bg-primary/10 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
