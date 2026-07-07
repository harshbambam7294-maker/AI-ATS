import { jobs } from "../../data/jobs";
import JobCard from "../cards/JobCard";

function LatestJobs() {
  return (
    <section className="bg-white py-16">

      <div className="mx-auto max-w-6xl px-6">

        <h2 className="mb-10 text-center text-4xl font-bold text-slate-800">
          Latest Jobs
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default LatestJobs;