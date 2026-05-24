export interface Experience {
  role: string
  org: string
  period: string
  description: string
  tags?: string[]
}

export const experience: Experience[] = [
  {
    role: 'AI Research Engineer',
    org: 'Self-Directed Research',
    period: '2024 — Present',
    description:
      'Building production-grade AI infrastructure. Focus: LLM serving optimization, CI intelligence systems, and distributed ML training pipelines.',
    tags: ['ML Infrastructure', 'LLMs', 'Distributed Systems'],
  },
  {
    role: 'Systems Engineering',
    org: 'Open Source',
    period: '2023 — Present',
    description:
      'Contributions to ML tooling, distributed systems libraries, and developer infrastructure projects. Authored packages used across academia and industry teams.',
    tags: ['Go', 'Python', 'Systems'],
  },
  {
    role: 'B.Sc. Computer Science',
    org: 'University',
    period: '2022 — Present',
    description:
      'Core coursework in algorithms, systems programming, machine learning theory, and distributed computing. Advanced study in neural architectures and GPU programming.',
    tags: ['CS Theory', 'ML', 'Systems'],
  },
]
