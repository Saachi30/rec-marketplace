import React from 'react';

const methods = [
  "Biogas production from anaerobic digestion of crop residues.",
  "Combustion of agricultural biomass for direct heat generation.",
  "Conversion of agricultural waste into bioethanol through fermentation.",
  "Pyrolysis of crop waste to produce biochar and bio-oil.",
  "Gasification of biomass for syngas generation."
];

const benefits = [
  "Reduces dependency on fossil fuels, promoting renewable energy.",
  "Helps in managing agricultural waste sustainably.",
  "Improves soil health through biochar application.",
  "Generates additional income for farmers from waste conversion.",
  "Reduces greenhouse gas emissions and mitigates climate change."
];

const FarmerEducation = () => (
  <section className="bg-white rounded-xl shadow-sm p-8 mb-12">
    <h2 className="text-3xl font-bold mb-6">Agricultural Waste to Energy Guide</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Conversion Methods</h3>
        <ul className="space-y-3">
          {methods.map((method, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-green-600">•</span>
              <span>{method}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Benefits</h3>
        <ul className="space-y-3">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-green-600">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default FarmerEducation;
