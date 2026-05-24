export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  tech: string[]
  year: string
  github: string
  demo?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'NEXUS',
    tagline: 'AI-assisted CI failure triage',
    description:
      'An intelligent pipeline that correlates git commits to CI/CD failures using language models and statistical analysis. Nexus pinpoints root causes across distributed build systems — surfacing the exact commit, file, and code path responsible for each failure pattern. Reduced mean time to debug by 73% in internal testing.',
    tech: ['Python', 'TypeScript', 'OpenAI API', 'Redis', 'PostgreSQL', 'GitHub API'],
    year: '2024',
    github: 'https://github.com/azfar-05',
    featured: true,
  },
  {
    id: '02',
    name: 'STRATUM',
    tagline: 'Distributed consensus engine',
    description:
      'A fault-tolerant distributed key-value store built from scratch implementing the RAFT consensus algorithm. Supports log compaction, dynamic cluster membership changes, and linearizable reads with full test coverage under simulated network partitions and byzantine conditions.',
    tech: ['Go', 'RAFT', 'RocksDB', 'gRPC', 'Prometheus'],
    year: '2024',
    github: 'https://github.com/azfar-05',
  },
  {
    id: '03',
    name: 'MERIDIAN',
    tagline: 'High-throughput ML inference',
    description:
      'Inference serving infrastructure purpose-built for large language models. Implements continuous batching, tensor parallelism, and KV cache management to maximize GPU utilization. Achieves 4× throughput improvement over naive serving with sub-100ms p99 latency.',
    tech: ['Python', 'CUDA', 'Triton', 'FastAPI', 'vLLM'],
    year: '2024',
    github: 'https://github.com/azfar-05',
  },
]
