/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashboardOverview } from './pages/Dashboard';
import { CourseList } from './pages/CourseList';
import { JobList } from './pages/JobList';
import { DashboardPlaceholder } from './pages/dashboard/DashboardPlaceholder';
import { StudentCourses } from './pages/dashboard/StudentCourses';
import { AIMentor } from './pages/dashboard/AIMentor';
import { ResumeBuilder } from './pages/dashboard/ResumeBuilder';
import { ATSChecker } from './pages/dashboard/ATSChecker';
import { CareerCounsellor } from './pages/dashboard/CareerCounsellor';
import { RoadmapGenerator } from './pages/dashboard/RoadmapGenerator';
import { MockInterview } from './pages/dashboard/MockInterview';
import { CodingAssistant } from './pages/dashboard/CodingAssistant';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminRoles } from './pages/admin/AdminRoles';
import { AdminPlaceholder } from './pages/admin/AdminPlaceholder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="placements/jobs" element={<JobList />} />
          
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="profile" element={<DashboardPlaceholder title="User Profile" description="Manage your personal information and preferences." actionText="Edit Profile" />} />
            
            {/* Student Routes */}
            <Route path="courses" element={<StudentCourses />} />
            <Route path="assignments" element={<DashboardPlaceholder title="Assignments" description="View pending and submitted assignments." />} />
            <Route path="projects" element={<DashboardPlaceholder title="Projects" description="Manage your portfolio projects." />} />
            <Route path="certificates" element={<DashboardPlaceholder title="Certificates" description="Download your course completion certificates." />} />
            <Route path="resume" element={<ResumeBuilder />} />
            <Route path="leaderboard" element={<DashboardPlaceholder title="Leaderboard" description="See where you stand among your peers." />} />
            
            {/* AI Routes */}
            <Route path="ai-mentor" element={<AIMentor />} />
            <Route path="ats-checker" element={<ATSChecker />} />
            <Route path="career-counsellor" element={<CareerCounsellor />} />
            <Route path="roadmap-generator" element={<RoadmapGenerator />} />
            <Route path="mock-interview" element={<MockInterview />} />
            <Route path="coding-assistant" element={<CodingAssistant />} />

            {/* Trainer Routes */}
            <Route path="trainer/courses" element={<DashboardPlaceholder title="My Content" description="Manage your published courses and modules." actionText="Create Course" />} />
            <Route path="trainer/grading" element={<DashboardPlaceholder title="Grading" description="Review student submissions and assign grades." />} />
            <Route path="trainer/students" element={<DashboardPlaceholder title="My Students" description="View progress of enrolled students." />} />
            <Route path="trainer/earnings" element={<DashboardPlaceholder title="Earnings" description="Track your revenue and payouts." />} />
            
            {/* HR Routes */}
            <Route path="hr/jobs" element={<DashboardPlaceholder title="Job Postings" description="Manage active job listings." actionText="Post New Job" />} />
            <Route path="hr/applications" element={<DashboardPlaceholder title="Applications" description="Review candidate applications." />} />
            <Route path="hr/interviews" element={<DashboardPlaceholder title="Interviews" description="Schedule and manage candidate interviews." />} />
            <Route path="hr/talent" element={<DashboardPlaceholder title="Talent Pool" description="Search for candidates in the platform database." />} />
            <Route path="hr/billing" element={<DashboardPlaceholder title="Billing" description="Manage corporate subscriptions and invoices." />} />
            
            {/* Common Routes */}
            <Route path="payments" element={<DashboardPlaceholder title="Payments" description="Manage your billing and transaction history." />} />
            <Route path="notifications" element={<DashboardPlaceholder title="Notifications" description="View system alerts and messages." />} />
            <Route path="support" element={<DashboardPlaceholder title="Support" description="Contact helpdesk or view FAQs." actionText="New Ticket" />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminPlaceholder title="Analytics" description="Deep dive into platform analytics and reports." />} />
          <Route path="students" element={<AdminPlaceholder title="Students" description="View student progress and activity." />} />
          <Route path="admissions" element={<AdminPlaceholder title="Admissions" description="Manage enrollment and admission applications." />} />
          <Route path="payments" element={<AdminPlaceholder title="Payments" description="Track revenue, transactions, and invoices." />} />
          <Route path="placements" element={<AdminPlaceholder title="Placements" description="Manage job placements and company drives." />} />
          <Route path="jobs" element={<AdminPlaceholder title="Jobs" description="Review all job postings and applications." />} />
          <Route path="blogs" element={<AdminPlaceholder title="Blogs" description="Write and manage editorial content." />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="roles" element={<AdminRoles />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="reports" element={<AdminPlaceholder title="Reports" description="Generate and export system reports." />} />
          <Route path="cms" element={<AdminPlaceholder title="CMS" description="Manage landing page content and assets." />} />
          <Route path="settings" element={<AdminPlaceholder title="Platform Settings" description="Global configuration and integrations." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
