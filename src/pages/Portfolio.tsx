import { formatDate } from '../utils/formatDate';
import { Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
export function Portfolio() {
  // Always use default user ID '1' since we no longer have authentication
  const userId = '1';
  const {
    profile,
    isLoading,
    error
  } = useProfile(userId);
  if (isLoading) {
    return <div className="max-w-7xl mx-auto text-center py-10" aria-live="polite">
        <p className="text-gray-500">Loading profile information...</p>
      </div>;
  }
  if (error) {
    return <div className="max-w-7xl mx-auto py-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert" aria-live="assertive">
          <p>{error}</p>
        </div>
      </div>;
  }
  if (!profile) {
    return <div className="max-w-7xl mx-auto text-center py-10" aria-live="polite">
        <p className="text-gray-500">Profile information not available.</p>
      </div>;
  }
  const {
    skills,
    workExperience,
    projects,
    certificates
  } = profile;
  const programmingLanguages = skills.filter(skill => skill.category === 'language');
  const frameworksAndTools = skills.filter(skill => skill.category === 'framework' || skill.category === 'tools');
  return <div className="max-w-7xl mx-auto">
      {/* Header/Personal Info Section */}
      <section aria-labelledby="personal-info-heading" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 id="personal-info-heading" className="text-2xl font-bold text-gray-900 mb-4 sr-only">
          Personal Information
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center md:justify-start">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 md:mb-0">
              <img src={profile.avatar} alt={`${profile.name}`} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {profile.name}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{profile.title}</p>
            <dl className="flex flex-col space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <dt className="sr-only">Date of Birth</dt>
                <Calendar className="h-5 w-5 mr-2" aria-hidden="true" />
                <dd>Born: {profile.birthDate ? formatDate(new Date(profile.birthDate)) : ''}</dd>
              </div>
              <div className="flex items-center text-gray-600">
                <dt className="sr-only">Email</dt>
                <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
                <dd>
                  <a href={`mailto:${profile.email}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center text-gray-600">
                <dt className="sr-only">Location</dt>
                <MapPin className="h-5 w-5 mr-2" aria-hidden="true" />
                <dd>{profile.location}</dd>
              </div>
            </dl>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                About Me
              </h3>
              <p className="text-gray-700">{profile.about}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Employment Section */}
      <section aria-labelledby="employment-heading" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 id="employment-heading" className="text-2xl font-bold text-gray-900 mb-4">
          Employment History
        </h2>
        <div className="space-y-6">
          {workExperience.map(job => <article key={job.id} className="border-b pb-4">
              <header>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <span className="text-gray-600">
                    <time dateTime={new Date(job.startDate).toISOString().split('T')[0]}>
                      {formatDate(new Date(job.startDate))}
                    </time>
                    {' - '}
                    {job.endDate ? <time dateTime={new Date(job.endDate).toISOString().split('T')[0]}>
                      {formatDate(new Date(job.endDate))}
                    </time> : 'Present'}
                  </span>
                </div>
                <h4 className="text-lg text-blue-700 mb-2">{job.company}</h4>
              </header>
              <p className="text-gray-700">{job.description}</p>
            </article>)}
        </div>
      </section>

      {/* Skills Section */}
      <section aria-labelledby="skills-heading" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 id="skills-heading" className="text-2xl font-bold text-gray-900 mb-4">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Programming Languages
            </h3>
            <div className="space-y-3">
              {programmingLanguages.map(skill => <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700" id={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {skill.name}
                    </span>
                    <span className="text-gray-700">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-labelledby={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="bg-blue-700 h-2 rounded-full" style={{
                  width: `${skill.level}%`
                }}></div>
                  </div>
                </div>)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Frameworks & tools
            </h3>
            <div className="space-y-3">
              {frameworksAndTools.map(skill => <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700" id={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {skill.name}
                    </span>
                    <span className="text-gray-700">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-labelledby={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="bg-green-700 h-2 rounded-full" style={{
                  width: `${skill.level}%`
                }}></div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section aria-labelledby="projects-heading" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 id="projects-heading" className="text-2xl font-bold text-gray-900 mb-4">
          Notable Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => <article key={project.id} className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200">
                {project.image && <img src={project.image} alt={`Screenshot of ${project.title} project`} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3" aria-label="Technologies used">
                  {project.technologies.map(tech => <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {tech}
                    </span>)}
                </div>
                {project.url && <a href={project.url} className="flex items-center text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm" aria-label={`View ${project.title} project (opens in a new window)`} target="_blank" rel="noopener noreferrer">
                    <span className="mr-1">View Project</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>}
              </div>
            </article>)}
        </div>
      </section>

      {/* Certificates Section */}
      <section aria-labelledby="certificates-heading" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 id="certificates-heading" className="text-2xl font-bold text-gray-900 mb-4">
          Certificates
        </h2>
        <dl className="space-y-4">
          {certificates.map(cert => <div key={cert.id} className="flex flex-col md:flex-row border-b pb-4">
              <dt className="md:w-1/4 mb-2 md:mb-0 text-gray-600">
                {cert.date && !isNaN(Date.parse(cert.date)) ? (
                  <time dateTime={new Date(cert.date).toISOString().split('T')[0]}>
                    {formatDate(new Date(cert.date))}
                  </time>
                ) : (
                  <span>Invalid date</span>
                )}
              </dt>
              <dd className="md:w-3/4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {cert.title}
                </h3>
                <p className="text-gray-700">{cert.issuer}</p>
              </dd>
            </div>)}
        </dl>
      </section>
    </div>;
}