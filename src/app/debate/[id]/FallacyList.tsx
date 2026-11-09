type Fallacy = {
    id : string,
    type : string,
    explanation : string
}

interface FallacyProps {
    fallacies : Fallacy[]
}

const mapping : Record<string,string> = {
    "STRAW_MAN" : "Straw Man",
    "FALSE_DILEMMA" : "False Dilemma",
    "AD_HOMINEM": "Ad Hominem",
    "HASTY_GENERALIZATION": "Hasty Generalization",
    "CIRCULAR_REASONING" : "Circular Reasoning",
    "APPEAL_TO_AUTHORITY": "Appeal To Authority"
}

export default function FallacyList({fallacies} : FallacyProps){
    if (fallacies.length === 0) return null
    return (
        <div className="ml-auto max-w-3xl rounded-2xl border border-yellow-900 bg-[#0E0E17] p-4">
            <p className="text-amber-300 text-l font-semibold tracking-[0.12em] mb-3">REASONING FLAWS SPOTTED</p>
            {fallacies.map((fallacy) => {
                return (
                    <details key = {fallacy.id} >
                        <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                            <span className="px-4 py-1.5 mt-3 text-l font-medium text-amber-300 border border-yellow-800 rounded-full bg-[#2A1F15]">{mapping[fallacy.type]}</span>
                        </summary>
                        <p className="mt-2 text-md font-medium leading-6 text-slate-400">{fallacy.explanation}</p>
                    </details>
                )
            })}
        </div>
    )
}