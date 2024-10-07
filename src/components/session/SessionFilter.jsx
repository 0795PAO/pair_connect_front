import { useStacks } from "@/hooks/useStacks";
import { useLevels } from "@/hooks/useLevels";
import { Loader } from "lucide-react";
import { Input } from "../ui/input";
import CheckboxChip from "../shared/CheckBoxChip";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Button } from "../ui/button";
import React, { forwardRef } from "react";

const SessionFilter = forwardRef(
  (
    {
      searchTerm,
      setSearchTerm,
      selectedStack,
      setSelectedStack,
      selectedLevel,
      setSelectedLevel,
    },
    ref
  ) => {
    const { data: stacks, isLoading: isStacksLoading } = useStacks();
    const { data: levels, isLoading: isLevelsLoading } = useLevels();
    const { elementRef } = useMousePosition();

    const handleStackChange = (stack) => {
      if (selectedStack.includes(stack)) {
        setSelectedStack(selectedStack.filter((s) => s !== stack));
      } else {
        setSelectedStack([...selectedStack, stack]);
      }
    };

    const handleLevelChange = (level) => {
      if (selectedLevel.includes(level)) {
        setSelectedLevel(selectedLevel.filter((l) => l !== level));
      } else {
        setSelectedLevel([...selectedLevel, level]);
      }
    };

    const resetFilters = () => {
      setSearchTerm("");
      setSelectedStack([]);
      setSelectedLevel([]);
    };

    if (isStacksLoading || isLevelsLoading) {
      return <Loader />;
    }

    return (
      <div
        className="border rounded-lg mouse-light-effect h-fit"
        ref={ref || elementRef}
      >
        <div className="p-5 card-with-light-effect">
          <section className="w-full p-3">
            <h4 className="text-xl font-semibold my-5">
              Filtra por lenguajes y Frameworks
            </h4>
            <Input
              type="text"
              placeholder="Buscar lenguaje..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 mb-4"
            />

            <h4 className="text-xl font-semibold my-5">Filtra por stack</h4>
            <div className="mb-4 flex justify-evenly items-center">
              {stacks &&
                stacks.length > 0 &&
                stacks.map((stack, index) => (
                  <CheckboxChip
                    key={index}
                    label={stack.label}
                    checked={selectedStack.includes(stack.label)}
                    onChange={() => handleStackChange(stack.label)}
                  />
                ))}
            </div>

            <h4 className="text-xl font-semibold my-5">Filtra por Nivel</h4>
            <div className="mb-4 flex justify-evenly items-center">
              {levels &&
                levels.length > 0 &&
                levels.map((level, index) => (
                  <CheckboxChip
                    key={index}
                    label={level.label}
                    checked={selectedLevel.includes(level.label)}
                    onChange={() => handleLevelChange(level.label)}
                  />
                ))}
            </div>

            <Button onClick={resetFilters} variant="outline" className="mt-4">
              Limpiar filtros
            </Button>
          </section>
        </div>
      </div>
    );
  }
);

export default SessionFilter;
