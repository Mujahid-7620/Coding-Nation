import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen, Briefcase, GraduationCap, Users } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Bridge the Gap Between <span className="text-indigo-600">Education</span> & <span className="text-indigo-600">Employment</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
            A unified ecosystem for learning management, skill assessment, recruitment, and AI-driven insights. Learn, teach, and hire all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/courses">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500">Explore Courses</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">Get Started</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-zinc-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
              title="Premium Courses"
              description="Access high-quality content from industry experts."
              delay={0.1}
            />
            <FeatureCard
              icon={<GraduationCap className="h-8 w-8 text-indigo-600" />}
              title="Skill Assessments"
              description="Validate your skills with our advanced evaluation engine."
              delay={0.2}
            />
            <FeatureCard
              icon={<Briefcase className="h-8 w-8 text-indigo-600" />}
              title="Top Placements"
              description="Connect with leading companies looking for your talent."
              delay={0.3}
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-indigo-600" />}
              title="Community"
              description="Join a thriving community of learners and educators."
              delay={0.4}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-200"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-zinc-900">{title}</h3>
      <p className="text-zinc-600">{description}</p>
    </motion.div>
  );
}
