/* eslint-disable react/prop-types */
import { useStacks } from "@/hooks/useStacks";
import { useLevels } from "@/hooks/useLevels";
import { Loader } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EventCalendar } from "@/components/shared/EventCalendar";
import CheckBox from "../shared/CheckBox";
import { useMousePosition } from "@/hooks/useMousePosition";

const SessionFilter = ({
  searchTerm,
  setSearchTerm,
  selectedStack,
  setSelectedStack,
  selectedLevel,
  setSelectedLevel,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const { data: stacks, isLoading: isStacksLoading } = useStacks();
  const { data: levels, isLoading: isLevelsLoading } = useLevels();
  const { elementRef } = useMousePosition()

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

  if (isStacksLoading || isLevelsLoading) {
    return <Loader />;
  }


  const resetFilters = () => {
    setSelectedStack([]);
    setSelectedLevel([]);
    setSelectedDate(null);
    setSelectedTime(null);
  };



  return (
    <div className="border rounded-lg mouse-light-effect" ref={elementRef}>
      <div className="p-5 card-with-light-effect">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <div>
            <h4 className="my-5 text-center">Filtra por lenguajes</h4>
            <Input
              type="text"
              placeholder="Buscar lenguaje..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 mb-4"
            />

            <h4 className="my-5 text-center">Filtra por stacks</h4>
            <div className="mb-4 flex flex-col justify-evenly items-start gap-5">
              {stacks.map((stack, index) => (

                <CheckBox
                  key={index}
                  label={stack.label}
                  checked={selectedStack.includes(stack.label)}
                  onChange={() => handleStackChange(stack.label)}
                />
              ))}
            </div>

            <h4 className="my-5 text-center">Filtra por niveles</h4>
            <div className="mb-4 flex flex-col justify-evenly items-start gap-5">
              {levels.map((level, index) => (
                <CheckBox
                  key={index}
                  label={level.label}
                  checked={selectedLevel.includes(level.label)}
                  onChange={() => handleLevelChange(level.label)}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="my-5 text-center">Filtra por fecha y hora</h4>
            <EventCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>

        </div>
        <div className="flex justify-center">
          <Button onClick={resetFilters} className="mt-4">
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionFilter;