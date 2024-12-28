import React from 'react';

const articles = [
  {
    title: "5 Ways Renewable Energy is Transforming Agriculture",
    excerpt: "Discover how renewable energy sources like solar and biogas are revolutionizing the agricultural sector, making it more sustainable and efficient.",
  },
  {
    title: "The Role of Technology in Reducing Agricultural Waste",
    excerpt: "Learn about cutting-edge technologies that help minimize waste in farming practices and promote circular economies.",
  },
  {
    title: "Top 10 Crops Suitable for Biomass Energy Production",
    excerpt: "Explore the most efficient crops for biomass energy production and their potential impact on renewable energy goals.",
  },
  {
    title: "How to Create a Sustainable Farm with Green Energy",
    excerpt: "A step-by-step guide to integrating green energy solutions into your farm operations to improve sustainability.",
  },
  {
    title: "The Economics of Agricultural Waste Conversion",
    excerpt: "Understand the financial benefits of converting agricultural waste into energy and how it can boost farmers' incomes.",
  },
  {
    title: "Biogas Basics: Turning Farm Waste into Energy",
    excerpt: "An introductory guide to biogas production from farm waste, highlighting its benefits and the steps involved.",
  },
];

const Articles = () => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, i) => (
        <article key={i} className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold mb-3">{article.title}</h3>
          <p className="text-gray-600">{article.excerpt}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Articles;
