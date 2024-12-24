import { AirlinesTable } from "~/shared/components/airlines/AirlinesTable";

export const Airlines = () => {
  return (
    <div className="prose p-10 text-white lg:prose-xl">
      <h1>Airlines</h1>

      <AirlinesTable />
    </div>
  );
};
