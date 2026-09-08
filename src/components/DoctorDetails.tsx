import type { Dictionary } from "@/i18n/dictionaries";
import { profileFields } from "@/content/medical-team";

export function DoctorDetails({ doctor, content }: {
  doctor: Dictionary["doctors"][number];
  content: Dictionary["aboutMedical"];
}) {
  return (
    <div className="min-w-0">
      <h2 className="font-serif text-3xl leading-snug sm:text-4xl">{doctor.name}</h2>
      <p className="mt-3 text-sm text-rose">{doctor.role}</p>
      <p className="mt-6 max-w-[50ch] text-sm leading-7 text-ink-muted">{doctor.philosophy}</p>
      {doctor.specialties.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {doctor.specialties.map(item => <li key={item} className="border border-line px-3 py-1 text-sm">{item}</li>)}
        </ul>
      )}
      <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
        {profileFields.map(field => (
          <div key={field} className="border-t border-line py-6">
            <h3 className="font-serif text-lg">{content[field]}</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-muted">
              {(doctor[field].length ? doctor[field] : [content.pending]).map((item, index) => (
                <li key={index} className="flex gap-3 break-words"><span aria-hidden="true" className="text-champagne">—</span><span className="min-w-0">{item}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
