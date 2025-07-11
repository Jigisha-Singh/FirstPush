
import React from 'react';
import { Target, Users, Lightbulb } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="section-divider absolute top-0 left-0 w-full" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Why FirstPush?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We believe everyone deserves a smooth entry into tech. FirstPush provides the guidance, 
            resources, and confidence you need to make your mark in the digital world.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: Target,
              title: 'Clear Direction',
              description: 'Step-by-step guides that break down complex processes into manageable tasks, perfect for beginners.',
              gradient: 'from-blue-500 to-blue-600'
            },
            {
              icon: Users,
              title: 'Community Focused',
              description: 'Built by developers, for developers. Real-world advice from people who\'ve been in your shoes.',
              gradient: 'from-purple-500 to-purple-600'
            },
            {
              icon: Lightbulb,
              title: 'Practical Learning',
              description: 'No fluff, just actionable content that gets you results. Templates, checklists, and pro tips included.',
              gradient: 'from-green-500 to-green-600'
            }
          ].map((item, index) => (
            <div
              key={item.title}
              className="bg-white dark:bg-gray-900 rounded-2xl p-10 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center card"
            >
              <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${item.gradient} mb-8 items-center justify-center shadow-lg`}>
                <item.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
