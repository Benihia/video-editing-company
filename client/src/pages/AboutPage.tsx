import React from 'react';
import Layout from '@/components/Layout';
import { ArrowRight, Award, Users, Clock, Zap, Globe, Phone, Mail } from 'lucide-react';
import { Link } from 'wouter';

// Team member type
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

// Team members data
const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alex Morgan',
    role: 'Founder & Lead Editor',
    bio: 'With over 15 years of experience in film and video production, Alex founded CineWave Studios to bring cinematic storytelling to brands and creators.',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
  },
  {
    name: 'Jamie Chen',
    role: 'Senior VFX Artist',
    bio: 'Jamie specializes in creating stunning visual effects that enhance storytelling without overwhelming the narrative.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
  },
  {
    name: 'Raj Patel',
    role: 'Color Grading Specialist',
    bio: 'Raj brings over a decade of experience in color science and grading to create the perfect visual aesthetic for each project.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
  }
];

// Stats for company highlights
const COMPANY_STATS = [
  { number: '10+', label: 'Years Experience', icon: <Clock className="w-6 h-6 text-cine-gold" /> },
  { number: '500+', label: 'Projects Completed', icon: <Award className="w-6 h-6 text-cine-gold" /> },
  { number: '200+', label: 'Happy Clients', icon: <Users className="w-6 h-6 text-cine-gold" /> },
  { number: '15', label: 'Industry Awards', icon: <Award className="w-6 h-6 text-cine-gold" /> }
];

export default function AboutPage() {
  return (
    <Layout>
      <section className="pt-28 pb-20 bg-gradient-to-b from-cine-black to-cine-gray-700 min-h-screen about-page-animation">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">About </span>
                <span className="text-cine-gold">CineWave Studios</span>
              </h1>
              <p className="text-cine-gray-300 text-lg mb-6 leading-relaxed">
                Founded in 2013, CineWave Studios has been at the forefront of cinematic video editing and post-production. 
                We combine technical expertise with creative vision to deliver premium video content that exceeds expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/portfolio" className="px-6 py-3 bg-cine-gold text-cine-black rounded-md font-medium hover:bg-white transition-colors">
                  View Our Work
                </Link>
                <Link href="/service-customizer" className="flex items-center px-6 py-3 border border-cine-gold text-cine-gold rounded-md font-medium hover:bg-cine-gold hover:text-cine-black transition-colors">
                  Start a Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-cine-black/70 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" 
                  alt="Video editing studio" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-cine-gold/20 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-cine-gold/10 blur-3xl"></div>
            </div>
          </div>
          
          {/* Company Stats */}
          <div className="glassmorphism rounded-xl p-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {COMPANY_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-cine-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Our Mission */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <div className="w-20 h-1 bg-cine-gold mx-auto mb-6"></div>
              <p className="text-cine-gray-300 text-lg leading-relaxed">
                Our mission is to transform raw footage into compelling visual stories that captivate audiences 
                and deliver messages with impact. We believe in the power of thoughtful editing to elevate any video project 
                from ordinary to extraordinary.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cine-gray-800/50 rounded-xl p-6 hover:bg-cine-gray-700/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cine-gold/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-cine-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Creative Excellence</h3>
                <p className="text-cine-gray-300">
                  We push creative boundaries to deliver unique, memorable content that stands out in today's crowded media landscape.
                </p>
              </div>
              
              <div className="bg-cine-gray-800/50 rounded-xl p-6 hover:bg-cine-gray-700/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cine-gold/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-cine-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Perspective</h3>
                <p className="text-cine-gray-300">
                  Our team brings diverse cultural insights to help brands and creators connect with audiences worldwide.
                </p>
              </div>
              
              <div className="bg-cine-gray-800/50 rounded-xl p-6 hover:bg-cine-gray-700/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cine-gold/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-cine-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client Partnership</h3>
                <p className="text-cine-gray-300">
                  We view our clients as partners in the creative process, ensuring their vision is realized through collaborative work.
                </p>
              </div>
            </div>
          </div>
          
          {/* Meet The Team */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <div className="w-20 h-1 bg-cine-gold mx-auto mb-6"></div>
              <p className="text-cine-gray-300 text-lg leading-relaxed">
                Our diverse team of editors, VFX artists, and colorists brings decades of combined experience 
                to every project. Get to know the creative minds behind CineWave Studios.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <div key={index} className="group">
                  <div className="rounded-xl overflow-hidden mb-4 aspect-[3/4] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-cine-black/80 via-transparent to-transparent z-10"></div>
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-cine-gold font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-cine-gray-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact CTA */}
          <div className="glassmorphism rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-cine-gray-300 text-lg max-w-2xl mx-auto mb-8">
              We're excited to learn about your project and how we can help bring your vision to life.
              Get in touch to discuss your video editing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:contact@cinewavstudios.com" 
                className="flex items-center justify-center px-6 py-3 bg-cine-gold text-cine-black rounded-md font-medium hover:bg-white transition-colors"
              >
                <Mail className="mr-2 w-4 h-4" />
                Email Us
              </a>
              <a 
                href="tel:+123456789" 
                className="flex items-center justify-center px-6 py-3 border border-cine-gold text-cine-gold rounded-md font-medium hover:bg-cine-gold hover:text-cine-black transition-colors"
              >
                <Phone className="mr-2 w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}