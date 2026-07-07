import {
  Building2,
  MapPin,
  IndianRupee,
  Briefcase,
} from "lucide-react";

function JobCard({ job }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <h3 className="text-2xl font-bold text-slate-800">
        {job.title}
      </h3>

      <div className="mt-5 space-y-3 text-gray-600">

        <div className="flex items-center gap-2">
          <Building2 size={18} />
          {job.company}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} />
          {job.location}
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee size={18} />
          {job.salary}
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={18} />
          {job.type}
        </div>

      </div>

      <button
        className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Apply Now
      </button>

    </div>
  );
}

export default JobCard;