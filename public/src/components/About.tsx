
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const About = () => {
  const benefits = [
    'Developed by Sri Lankan researchers for local contexts',
    'Trained on millions of multilingual Sri Lankan data points',
    'Continuously improved through user feedback',
    'Optimized for local hardware and infrastructure constraints',
    'Supports all official languages of Sri Lanka',
    'Committed to responsible AI development and usage'
  ];

  return (
    <section id="about" className="py-20">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
            <div className="relative z-10 glass p-3 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="inline-block mb-4">
                      <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="text-primary font-bold text-xl">SriAI</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-foreground">
                      "Created with dedication to empower Sri Lankans with cutting-edge artificial intelligence technology"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/4 right-0 transform translate-x-1/4 z-20">
              <div className="glass p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    5+
                  </div>
                  <div>
                    <div className="text-sm font-medium">Years of</div>
                    <div className="text-xs">Research</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 left-0 transform -translate-x-1/4 z-20">
              <div className="glass p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    99%
                  </div>
                  <div>
                    <div className="text-sm font-medium">Accuracy in</div>
                    <div className="text-xs">Local Context</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <div className="chip">About Our AI</div>
            <h2 className="heading-lg">Built in Sri Lanka, for Sri Lanka</h2>
            <p className="text-lg text-muted-foreground">
              Our AI model has been specifically engineered to address the unique needs and challenges of 
              Sri Lankan users. With a deep understanding of local languages, cultural nuances, and 
              technology infrastructure, we've created an AI solution that truly works for our community.
            </p>

            <div className="space-y-3 mt-4">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check size={16} className="text-primary" />
                  </div>
                  <p>{benefit}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <a href="#features" className="btn-primary">
                Discover How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
