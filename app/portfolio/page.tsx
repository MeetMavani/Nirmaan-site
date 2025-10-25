"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const projects = [
  {
    name: 'Shreya Motors App',
    tagline: 'Electric vehicle management platform',
    problem: 'Application required to manage electric vehicles and their rental assignments',
    solution: 'Built a comprehensive application with real time location updates, batteries and charging management',
    result: '80% improvement in logistics, 50% improved charging and battery management, new implementation of database',
    tech: ['Bubble.io'],
    testimonial: '"Nirmaan transformed our operations. The platform is intuitive and reliable." - Dr. Sarah Johnson, CTO',
    link: '#',
    github: '#'
  },
  {
    name: 'Ajinkya Social Foundation',
    tagline: 'Non-Profit Organization website',
    problem: 'Required website to improve reach and simplify donation process',
    solution: 'Developed a dynamic website having integrated payment gateway along with CMS and CRUD functionalities',
    result: 'Information about the NGO became accessible, improved donation frequency by 70%, simplified donation process significantly',
    tech: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis'],
    testimonial: '"The AI recommendations have been incredibly accurate." - Michael Chen, VP of Technology',
    link: 'https://ajinkyasocialfoundation.org',
    github: 'https://github.com/MeetMavani/AJFO'
  },
  {
    name: 'Zenova',
    tagline: 'GSAP Showcase',
    problem: 'Needed a showcase for GSAP and Framer Motion abilities of the team',
    solution: 'Created a scroll controlled website with smooth animations and responsive UI',
    result: 'Displayed animation skills of the team',
    tech: ['Vue', 'Django', 'MongoDB', 'WebRTC', 'AWS S3'],
    testimonial: '"Student engagement has never been higher." - Prof. Anita Kumar, Director',
    link: 'https://zenova-nine.vercel.app/',
    github: 'https://github.com/MeetMavani/Zenova'
  },
  {
    name: 'WeConnect Overseas',
    tagline: 'Educational support platform',
    problem: 'WeConnect Oversease needed a complete overhaul of their homepage',
    solution: 'Built a modern, elegant and catchy homepage with smooth minimalist animations and pleasing UI',
    result: 'Improvement in establishing trust in students',
    tech: ['React Native', 'Node.js', 'Stripe', 'Elasticsearch', 'Docker'],
    testimonial: '"Our online revenue has tripled since launch." - Priya Sharma, CEO',
    link: 'https://www.weconnectoverseas.info',
    github: '#'
  }
];

const Portfolio = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Work</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real projects, real results. See how we've helped businesses succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Visual/Logo Section */}
                    <div className="bg-gradient-accent p-12 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-6 bg-background rounded-2xl flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary">
                            {project.name.substring(0, 2)}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{project.name}</h3>
                        <p className="text-white/90">{project.tagline}</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-primary">Problem</h4>
                          <p className="text-muted-foreground">{project.problem}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-primary">Solution</h4>
                          <p className="text-muted-foreground">{project.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-primary">Results</h4>
                          <p className="text-muted-foreground font-medium">{project.result}</p>
                        </div>

                        {/* <div>
                          <h4 className="font-semibold text-sm mb-3">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div> */}

                        <div className="pt-4 border-t border-border">
                          {/* <p className="text-sm italic text-muted-foreground mb-4">
                            {project.testimonial}
                          </p> */}
                          <div className="flex gap-3">
                            <Button size="sm" variant="default">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Project
                            </Button>
                            <Button size="sm" variant="outline">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
