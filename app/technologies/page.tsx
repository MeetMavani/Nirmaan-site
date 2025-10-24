"use client";

// Technology icons - Easy to modify this array to add/remove technologies
export const techStack = {
    frontend: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'Vue', icon: '💚' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Framer Motion', icon: '🎬' }
    ],
    backend: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'Django', icon: '🎸' },
      { name: 'Flask', icon: '🌶️' },
      { name: 'Express', icon: '🚂' },
      { name: 'GraphQL', icon: '◼️' }
    ],
    mobile: [
      { name: 'React Native', icon: '📱' },
      { name: 'Flutter', icon: '🦋' },
      { name: 'Swift', icon: '🍎' },
      { name: 'Kotlin', icon: '🤖' }
    ],
    cloud: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Google Cloud', icon: '🌐' },
      { name: 'Azure', icon: '🔷' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '☸️' },
      { name: 'Terraform', icon: '🏗️' }
    ],
    database: [
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Redis', icon: '🔴' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'Elasticsearch', icon: '🔍' }
    ],
    aiml: [
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'OpenCV', icon: '👁️' },
      { name: 'OpenAI', icon: '🤖' },
      { name: 'Langchain', icon: '⛓️' }
    ],
    devops: [
      { name: 'GitHub Actions', icon: '⚙️' },
      { name: 'Jenkins', icon: '👨‍🔧' },
      { name: 'GitLab CI', icon: '🦊' },
      { name: 'CircleCI', icon: '⭕' },
      { name: 'Nginx', icon: '🌐' },
      { name: 'Prometheus', icon: '📊' }
    ]
  };
  
import { motion } from 'framer-motion';
  import { Card } from '@/components/ui/card';
  
  const Technologies = () => {
    return (
      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Technologies & Tools</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We work with modern, battle-tested technologies to build robust solutions
              </p>
            </motion.div>
          </div>
        </section>
  
        {/* Tech Stack */}
        <section className="py-20">
          <div className="container mx-auto px-4 space-y-16">
            {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-8 capitalize text-center">
                  {category === 'frontend' && '🎨 Frontend'}
                  {category === 'backend' && '⚙️ Backend'}
                  {category === 'mobile' && '📱 Mobile'}
                  {category === 'cloud' && '☁️ Cloud & Infrastructure'}
                  {category === 'database' && '💾 Databases'}
                  {category === 'aiml' && '🤖 AI/ML'}
                  {category === 'devops' && '🔧 DevOps & CI/CD'}
                </h2>
  
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
                        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                          {tech.icon}
                        </div>
                        <p className="font-semibold text-sm">{tech.name}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
  
        {/* Note */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Not Just Tools, Expertise</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                We don't just use these technologies—we master them. Our team stays updated with 
                the latest best practices, attends conferences, and contributes to open source. 
                This ensures we deliver solutions using the right tool for your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                  Continuous Learning
                </span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                  Open Source Contributors
                </span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                  Industry Certifications
                </span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                  Tech Community Leaders
                </span>
              </div>
            </motion.div>
          </div>
        </section>
  
        {/* Instructions for modification */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-primary">📝 Easy Modification Guide</h3>
              <p className="text-muted-foreground mb-4">
                To add or remove technologies, simply edit the <code className="bg-muted px-2 py-1 rounded">techStack</code> object 
                at the top of <code className="bg-muted px-2 py-1 rounded">src/pages/Technologies.tsx</code>
              </p>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                <pre className="text-muted-foreground overflow-x-auto">
  {`frontend: [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    // Add more here...
  ]`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Each technology entry needs a <code className="bg-muted px-1 rounded">name</code> and 
                an <code className="bg-muted px-1 rounded">icon</code> (emoji). The icons automatically 
                render in the grid above.
              </p>
            </Card>
          </div>
        </section>
      </div>
    );
  };
  
  export default Technologies;
  