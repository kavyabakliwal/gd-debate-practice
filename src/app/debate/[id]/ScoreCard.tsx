import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ['latin']
})

export type EvaluationData = {
    relevanceScore : number,
    evidenceScore : number,
    logicScore : number,
    counterargumentScore : number,
    persuasivenessScore : number,
    relevanceReason : string,
    evidenceReason : string,
    logicReason : string,
    counterargumentReason : string,
    persuasivenessReason : string,
    overallScore : number
}



function scoreStyle(score : number): {textClass: string,baseClass: string} {
    if (score >= 7) return {textClass: "text-emerald-400",baseClass: "bg-emerald-500"}
    else if (score >= 4) return {textClass: "text-amber-400",baseClass: "bg-amber-500"}
    // When score is less than or equal to 3
    return {textClass: "text-red-400", baseClass: "bg-red-500"}
}

interface EvaluationProps {
    evaluation : EvaluationData
}

export default function ScoreCard({evaluation} : EvaluationProps){
    const rows = [
        {
            label : "Evidence",
            score : evaluation.evidenceScore,
            reason : evaluation.evidenceReason
        },
        {
            label : "Relevance",
            score : evaluation.relevanceScore,
            reason : evaluation.relevanceReason
        },
        {
            label : "Logic",
            score : evaluation.logicScore,
            reason : evaluation.logicReason
        },
        {
            label : "Counterargument",
            score : evaluation.counterargumentScore,
            reason : evaluation.counterargumentReason
        },
        {
            label : "Persuasiveness",
            score : evaluation.persuasivenessScore,
            reason : evaluation.persuasivenessReason
        },
    ]
    const {textClass: overallTextClass} = scoreStyle(evaluation.overallScore)

//     Map over rows: {rows.map((row) => { ... })}. Because you use curly braces, you need an explicit return ( ... ) inside, the same trap as the .map() in your evaluator prompt. If you want to skip the return, use parentheses instead of braces and call scoreStyle(row.score) inline.
// Get the colours for each row: const { textClass, baseClass } = scoreStyle(row.score) at the top of the map body. Name them differently from the overall ones if there’s a clash. Since this is inside the callback, they won’t conflict.
// Each row is a <details> with key={row.label} and className="border-t border-slate-800 py-3".
// Inside it, a <summary> with className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden". It holds three things:
// the label: <span className="w-36 text-sm text-slate-300">
// the bar: a track <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800"> with an inner <span> that has className={`block h-full rounded-full ${baseClass}`} and style={{ width: ${row.score * 10}% }}
// the score: <span className={w-12 text-right text-sm font-medium ${textClass}}>{row.score}/10</span>
// After the <summary>, a <p> with className="mt-2 text-sm leading-6 text-slate-400" that shows {row.reason}.

    return (
        <div className={`ml-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-4 ${inter.className}`}>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-s font-medium tracking-wider text-slate-400">EVALUATION</p>
                    <p className="text-s text-slate-500">Average of five scores</p>
                </div>
                <div className="flex flex-row items-baseline gap-2">
                    <p className= {`text-3xl font-medium ${evaluation.overallScore.toFixed(1)} ${overallTextClass}`}>{evaluation.overallScore}</p>
                    <p className="text-sm text-slate-500">/ 10</p>
                </div>
            </div>    
                {rows.map((row) => {
                    const {textClass,baseClass} = scoreStyle(row.score)
                    return (
                        <details key = {row.label} className="border-t border-slate-800 py-3">
                            <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                                <span className="w-36 text-m  text-slate-300">{row.label}</span>
                                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                                    <span className={`block h-full rounded-full ${baseClass}`} style={{ width: `${row.score * 10}%` }} ></span>
                                </span>
                                <span className={`w-12 text-right text-sm font-medium ${textClass}`}>{row.score}/10</span>
                                {/* <p>+</p> */}
                            </summary>
                            <p className="mt-2 text-sm leading-6 text-slate-400">{row.reason}</p>
                        </details>
                    )
                })}

        </div>
    )
}