export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  tech: string[]
  year: string
  github?: string
  demo?: string
  featured?: boolean
  status?: string
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'CauseTrace',
    tagline: 'Causal chain debugging for software failures',
    description:
      'A research project exploring how to trace the causal chain behind software failures. Given a failing build, CauseTrace parses logs, test output, and git history to reconstruct the sequence of contributing causes — not just what failed, but where the chain began. Exploring how language models can assist root-cause reasoning across real codebases.',
    tech: ['Python', 'TypeScript', 'Node.js', 'PostgreSQL'],
    year: '2025',
    featured: true,
    status: 'In Development',
  },
  {
    id: '02',
    name: 'Machine Failure Prediction',
    tagline: 'Predictive maintenance with ML',
    description:
      'ML system predicting machine failures from operational parameters — temperature, rotational speed, torque, and tool wear — across 10,000 records covering five failure modes. Built with Streamlit for interactive exploration.',
    tech: ['Python', 'scikit-learn', 'Streamlit'],
    year: '2024',
    github: 'https://github.com/azfar-05/machine-failure-prediction',
  },
  {
    id: '03',
    name: 'Vehicle & Pedestrian Detection',
    tagline: 'Real-time CV with YOLOv8',
    description:
      'Real-time detection pipeline with confidence scoring, object counting, and FPS monitoring. Supports webcam and video stream input with processed output saving.',
    tech: ['Python', 'OpenCV', 'YOLOv8', 'Ultralytics'],
    year: '2025',
    github: 'https://github.com/azfar-05/real-time-vehicle-pedestrian-detection',
    status: 'In Progress',
  },
  {
    id: '04',
    name: 'Kisan Setu',
    tagline: 'Voice-first agricultural marketplace',
    description:
      'Hackathon project enabling farmers to list and sell crops via IVR calls — no smartphone or digital literacy required. Integrates live mandi pricing, multilingual voice interfaces, and direct buyer connections.',
    tech: ['Next.js', 'TypeScript', 'tRPC', 'PostgreSQL', 'VAPI', 'n8n'],
    year: '2025',
    github: 'https://github.com/azfar-05/kisan-setu',
    status: 'Hackathon',
  },
]
