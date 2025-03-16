
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'Bringing Advanced AI to Sri Lanka: Our Journey',
    excerpt: 'Learn about the development process and challenges we overcame to create an AI model specifically for Sri Lankan contexts.',
    date: 'May 12, 2023',
    readTime: '5 min read',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    title: 'How SriAI is Transforming Local Businesses',
    excerpt: 'Discover how companies across Sri Lanka are leveraging our AI model to streamline operations and improve customer experiences.',
    date: 'June 3, 2023',
    readTime: '8 min read',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    title: 'The Future of Multilingual AI for Sri Lanka',
    excerpt: 'Explore our vision for the next generation of AI technologies that will better serve Sri Lanka\'s diverse linguistic landscape.',
    date: 'July 21, 2023',
    readTime: '6 min read',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-20">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="chip mb-4">Our Blog</div>
          <h2 className="heading-lg">Latest Insights & Updates</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest developments in AI technology for Sri Lanka
            and discover how our solutions are making an impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-border transition-all duration-300 hover:shadow-lg group"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                
                <a href="#" className="inline-flex items-center text-primary font-medium group-hover:underline">
                  Read More
                  <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a href="#" className="btn-outline">
            View All Articles
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
