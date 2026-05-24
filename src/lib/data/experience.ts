export interface Experience {
  role: string
  org: string
  period: string
  description: string
  tags?: string[]
}

export const experience: Experience[] = [
  {
    role: 'B.Tech, AI & Machine Learning',
    org: 'NMAM Institute of Technology',
    period: '2024 — 2028',
    description:
      'Core coursework in machine learning, systems programming, algorithms, and applied AI. Building projects across computer vision, predictive systems, developer tooling, and engineering workflow intelligence.',
    tags: ['Machine Learning', 'Python', 'Systems', 'AI'],
  },
]
