import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Loader className="animate-spin [animation-duration:2s]" size={70} />
      <p className="text-3xl font-semibold flex items-center me-1">
        Loading
        <span className="animate-bounce text-3xl">.</span>
        <span className="animate-bounce delay-200 text-3xl">.</span>
        <span className="animate-bounce delay-400 text-3xl" >.</span>
      </p>
    </div>
  );
}
