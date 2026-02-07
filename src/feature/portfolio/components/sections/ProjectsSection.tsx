import type { Project } from '@/api/portfolio/types';
import styles from './ProjectsSection.module.css';

interface ProjectsSectionProps {
  data: Project[];
}

export const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.sectionTitle}>Projects</h2>
      <div className={styles.projectsContainer}>
        {data.map((project) => (
          <div key={project.id} className={styles.projectItem}>
            <div className={styles.projectLeft}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    @GitHub
                  </a>
                )}
              </div>

              <div className={styles.projectIntro}>
                <span className={styles.divider}>── 프로젝트 소개 ──</span>
                <p className={styles.projectDesc}>{project.description}</p>
              </div>

              {project.features.length > 0 && (
                <div className={styles.projectWork}>
                  <span className={styles.divider}>── 주요 기능 ──</span>
                  <ul className={styles.featureList}>
                    {project.features.map((feature, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.troubleshooting.length > 0 && (
                <div className={styles.projectTroubleshooting}>
                  <span className={styles.divider}>── 트러블슈팅 ──</span>
                  {project.troubleshooting.map((item, idx) => (
                    <div key={idx} className={styles.troubleshootingItem}>
                      <div className={styles.troubleshootingProblem}>
                        <strong>문제점</strong>
                        <p>{item.problem}</p>
                      </div>
                      <div className={styles.troubleshootingSolution}>
                        <strong>결과</strong>
                        <ul>
                          {item.solutions.map((solution, sIdx) => (
                            <li key={sIdx}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.projectRight}>
              <p className={styles.projectPeriod}>{project.period}</p>
              <p className={styles.projectTeam}>{project.team}</p>
              <p className={styles.projectRole}>{project.role}</p>
              <div className={styles.projectSkills}>
                <span className={styles.skillsLabel}>Skills</span>
                <ul className={styles.skillsList}>
                  {project.skills.map((skill, idx) => (
                    <li key={idx} className={styles.skillItem}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};