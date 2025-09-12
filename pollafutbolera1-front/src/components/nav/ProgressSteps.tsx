"use client";
import * as React from "react";

// Define the structure for each step
interface Step {
  label?: string;
  icon?: React.ReactNode;
}

interface ProgressStepsProps {
  currentStep: number;
  steps?: Step[] | number; // Accept either an array of Step objects or just the number of steps
  className?: string;
  containerClassName?: string;
  stepClassName?: string;
  activeStepClassName?: string;
  inactiveStepClassName?: string;
  dividerClassName?: string;
  activeDividerClassName?: string;
  inactiveDividerClassName?: string;
}

export function ProgressSteps({ 
  currentStep, 
  steps = 3,
  className = "",
  containerClassName = "",
  stepClassName = "",
  activeStepClassName = "",
  inactiveStepClassName = "",
  dividerClassName = "",
  activeDividerClassName = "",
  inactiveDividerClassName = ""
}: ProgressStepsProps) {
  // Convert number to array of empty steps if needed
  const stepsArray: Step[] = Array.isArray(steps) 
    ? steps 
    : Array(steps).fill({}).map((_, i) => ({ label: `${i + 1}` }));

  return (
    <div className={`flex justify-center w-full ${className}`}>
      <div className={`flex gap-2 w-full max-w-md mx-auto ${containerClassName}`}>
        {stepsArray.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step circle */}
            <span 
              className={`flex-shrink-0 px-3.5 text-base font-medium leading-none text-white whitespace-nowrap rounded-full h-[34px] w-[34px] flex items-center justify-center
                ${currentStep >= index + 1 
                  ? `bg-indigo-600 ${activeStepClassName}` 
                  : `bg-gray-200 text-gray-500 ${inactiveStepClassName}`}
                ${stepClassName}`}
              title={step.label}
            >
              {step.icon || step.label || (index + 1)}
            </span>
            
            {/* Divider (don't render after the last item) */}
            {index < stepsArray.length - 1 && (
              <div 
                className={`flex-grow h-1.5 my-auto rounded-[40px]
                  ${currentStep > index + 1 
                    ? `bg-indigo-600 ${activeDividerClassName}` 
                    : `bg-gray-300 ${inactiveDividerClassName}`}
                  ${dividerClassName}`} 
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}