const { serverFetch } = require("./common")

export const getAllLessonsByPlan = async(plan)=>{
    if (plan === "Free") {
        const res = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/lessons/free`)
        const data = await res.json()
        return data;
    }
    if (plan === "Premium") {
        const res = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/lessons/premium`)
        const data = await res.json()
        return data;
    }
}