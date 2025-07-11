
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Download, Star, Eye, Copy, Check, X, FileText, Code, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer';

interface Template {
  id: string;
  title: string;
  description: string;
  type: 'PDF Template' | 'Code Template' | 'README Template';
  downloads: number;
  rating: number;
  preview: string;
  features: string[];
  content: string;
  htmlPreview?: string;
  category: 'resume' | 'portfolio' | 'readme';
}

const TemplatesPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'readmes'>('templates');
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; template: Template | null }>({
    isOpen: false,
    template: null
  });

  const templates: Template[] = [
    {
      id: 'resume-modern',
      title: 'Modern Resume Template',
      description: 'Clean, ATS-friendly resume template perfect for tech professionals',
      type: 'PDF Template',
      downloads: 1247,
      rating: 4.9,
      preview: '/api/placeholder/300/400',
      features: ['ATS Optimized', 'Easy to Edit', 'Professional Design', 'Multiple Sections'],
      category: 'resume',
      content: `# Modern Resume Template

## Personal Information
- **Name:** [Your Full Name]
- **Email:** [your.email@example.com]
- **Phone:** [+1 (555) 123-4567]
- **LinkedIn:** [linkedin.com/in/yourprofile]
- **GitHub:** [github.com/yourusername]

## Professional Summary
[2-3 sentences highlighting your key skills and career objectives]

## Technical Skills
- **Languages:** JavaScript, Python, Java, HTML/CSS
- **Frameworks:** React, Node.js, Express, Django
- **Tools:** Git, Docker, AWS, MongoDB
- **Soft Skills:** Problem-solving, Team collaboration, Communication

## Experience
### [Job Title] | [Company Name] | [Date]
- [Achievement or responsibility with quantifiable impact]
- [Another key accomplishment]
- [Technical skills used]

## Education
### [Degree] | [University] | [Year]
- **Relevant Coursework:** Data Structures, Algorithms, Web Development
- **GPA:** [If 3.5+]

## Projects
### [Project Name] | [Technologies Used]
- [Brief description and impact]
- **Link:** [github.com/yourusername/project]`,
      htmlPreview: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 2.5em;">John Doe</h1>
            <p style="color: #7f8c8d; margin: 5px 0; font-size: 1.2em;">Full Stack Developer</p>
            <div style="margin-top: 15px;">
              <span style="color: #3498db; margin: 0 10px;">john.doe@email.com</span>
              <span style="color: #3498db; margin: 0 10px;">+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Professional Summary</h2>
            <p style="line-height: 1.6; color: #34495e;">
              Experienced full-stack developer with 5+ years building scalable web applications. 
              Proficient in modern JavaScript frameworks and cloud technologies.
            </p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Technical Skills</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <strong style="color: #2c3e50;">Languages:</strong> JavaScript, Python, Java, HTML/CSS
              </div>
              <div>
                <strong style="color: #2c3e50;">Frameworks:</strong> React, Node.js, Express, Django
              </div>
            </div>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Experience</h2>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #34495e; margin: 0;">Senior Developer | Tech Corp | 2022-Present</h3>
              <ul style="color: #34495e; line-height: 1.6;">
                <li>Led development of 3 major web applications serving 100K+ users</li>
                <li>Mentored 5 junior developers and improved team productivity by 40%</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'portfolio-react',
      title: 'React Portfolio Starter',
      description: 'Complete React portfolio template with modern design and animations',
      type: 'Code Template',
      downloads: 856,
      rating: 4.8,
      preview: '/api/placeholder/300/400',
      features: ['Responsive Design', 'Dark Mode', 'Animations', 'SEO Optimized'],
      category: 'portfolio',
      content: `// Portfolio Starter Code
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="portfolio">
      <header className="hero">
        <h1>Your Name</h1>
        <p>Full Stack Developer</p>
        <div className="social-links">
          <a href="https://github.com/yourusername">GitHub</a>
          <a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
        </div>
      </header>
      
      <section className="about">
        <h2>About Me</h2>
        <p>Passionate developer with experience in modern web technologies...</p>
      </section>
      
      <section className="projects">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {/* Project cards will go here */}
        </div>
      </section>
      
      <section className="contact">
        <h2>Get In Touch</h2>
        <p>Let's build something amazing together!</p>
      </section>
    </div>
  );
}

export default App;`
    },
    {
      id: 'readme-professional',
      title: 'Professional GitHub README',
      description: 'Comprehensive README template for GitHub repositories',
      type: 'README Template',
      downloads: 2341,
      rating: 4.9,
      preview: '/api/placeholder/300/400',
      features: ['Project Overview', 'Installation Guide', 'Usage Examples', 'Contributing Guidelines'],
      category: 'readme',
      content: `# Project Name

A brief description of what this project does and who it's for.

## Features

- 🔥 Feature 1
- ⚡ Feature 2  
- 💡 Feature 3

## Installation

Install my-project with npm

\`\`\`bash
  npm install my-project
\`\`\`

## Usage

\`\`\`javascript
import { myFunction } from 'my-project'

const result = myFunction()
console.log(result)
\`\`\`

## API Reference

### myFunction()

Returns a string.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`api_key\` | \`string\` | **Required**. Your API key |

## Contributing

Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](https://opensource.org/licenses/agpl-v3)`
    },
    {
      id: 'readme-minimal',
      title: 'Minimal GitHub README',
      description: 'Clean and simple README template for small projects',
      type: 'README Template',
      downloads: 1567,
      rating: 4.7,
      preview: '/api/placeholder/300/400',
      features: ['Simple Layout', 'Quick Setup', 'Essential Info', 'Clean Design'],
      category: 'readme',
      content: `# Project Name

Simple description of your project.

## Getting Started

\`\`\`bash
git clone https://github.com/username/project-name
cd project-name
npm install
npm start
\`\`\`

## Usage

Describe how to use your project.

## Contributing

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`
    }
  ];

  const filteredTemplates = useMemo(() => {
    if (activeTab === 'templates') {
      return templates.filter(t => t.category !== 'readme');
    } else {
      return templates.filter(t => t.category === 'readme');
    }
  }, [activeTab]);

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePreview = (template: Template) => {
    setPreviewModal({ isOpen: true, template });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, template: null });
  };

  const renderSyntaxHighlightedContent = (content: string, language: string) => {
    // Simple syntax highlighting for markdown and code
    const highlighted = content
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-800 text-green-400 p-4 rounded my-4 overflow-x-auto"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-800 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-700 mb-2">$1</h3>')
      .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    return { __html: highlighted };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Templates & Tools</h1>
          <p className="text-gray-600">Professional templates to jumpstart your career</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Resume & Portfolio Templates
              </button>
              <button
                onClick={() => setActiveTab('readmes')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'readmes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Code className="h-4 w-4 inline mr-2" />
                GitHub README Templates
              </button>
            </nav>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
                    <p className="text-gray-600 text-sm">{template.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.type === 'PDF Template' ? 'bg-blue-100 text-blue-600' :
                    template.type === 'Code Template' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {template.type}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{template.downloads} downloads</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {template.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Template Content</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePreview(template)}
                        className="flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded text-sm transition-colors"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleCopy(template.content, template.id)}
                        className="flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors"
                      >
                        {copiedId === template.id ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="text-xs text-gray-700 bg-white p-3 rounded border max-h-48 overflow-y-auto">
                    {template.content}
                  </pre>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button 
                    onClick={() => handlePreview(template)}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewModal.isOpen && previewModal.template && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {previewModal.template.title} - Preview
              </h2>
              <button
                onClick={closePreview}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {previewModal.template.type === 'PDF Template' && previewModal.template.htmlPreview ? (
                <div 
                  className="border rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: previewModal.template.htmlPreview }}
                />
              ) : (
                <div className="bg-gray-900 rounded-lg p-6">
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={renderSyntaxHighlightedContent(previewModal.template.content, 'markdown')}
                  />
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {previewModal.template.type} • {previewModal.template.downloads} downloads
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleCopy(previewModal.template!.content, previewModal.template!.id)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Template
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TemplatesPage;
