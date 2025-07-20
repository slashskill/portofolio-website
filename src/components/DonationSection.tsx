import React from 'react';
import { motion } from 'framer-motion';
import './DonationSection.css';

const DonationSection: React.FC = () => {
  return (
    <section id="donate" className="donation-section page-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Support My Work
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        If you find my work valuable, consider supporting my efforts. Every contribution helps!
      </motion.p>
      <div className="donation-buttons">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="donation-button"
        >
          Buy Me a Coffee
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="donation-button"
          onClick={() => window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=pieter.van.laere11@gmail.com&item_name=Donation for Portfolio&amount=10.00&currency_code=USD', '_blank')}
        >
          PayPal
        </motion.button>
      </div>
    </section>
  );
};

export default DonationSection;
