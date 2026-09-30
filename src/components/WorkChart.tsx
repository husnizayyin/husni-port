import type { WorkPipeline } from '../data/work';

interface WorkPipelineProps {
  pipeline: WorkPipeline;
  color: string;
}

/**
 * Modern Engineering Architecture & Dataflow Pipeline.
 * Replaces abstract sparklines with real system architecture stages.
 */
export function WorkChart({ pipeline, color }: WorkPipelineProps) {
  return (
    <div className="work-pipeline" style={{ '--card-accent': color } as React.CSSProperties}>
      <div className="pipeline-header">
        <span className="pipeline-dot" />
        <span className="pipeline-label">{pipeline.label}</span>
      </div>
      <div className="pipeline-track">
        <div className="pipeline-line" />
        <div className="pipeline-steps">
          {pipeline.steps.map((step, idx) => (
            <div className="pipeline-node" key={step}>
              <span className="node-marker">
                <i className="node-dot" />
              </span>
              <span className="node-label">{step}</span>
              {idx < pipeline.steps.length - 1 && (
                <span className="node-arrow" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
