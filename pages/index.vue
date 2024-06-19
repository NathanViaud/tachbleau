<script lang="ts" setup>
definePageMeta({
    middleware: 'user-only'
})
</script>

<template>
    <div class="mx-12">
        <div class="grid grid-cols-3 gap-4 flex-col">
            <div class="flex w-full justify-between col-span-2 px-12 gap-4">
                <indexCard 
                    title="Gestion des tâches / KANBAN" 
                    description="Création, modification et suppression des tâches. Assignation des tâches"
                    toRoute="/kanban"
                />
                <indexCard 
                    title="Gestion des Projets" 
                    description="Création, modification et suppression des projets"
                    toRoute="/projects"
                />
                <indexCard 
                    title="Gestion des membres de l'équipe" 
                    description="Création, modification et suppression d'un membre de l'équipe"
                    toRoute="/stafflist"
                />   
            </div>
        </div>
        <div class="mt-20 px-8">
            <div class="my-8">
                <h3 class="text-3xl font-bold">Charge globale des équipes</h3>
            </div>
            <ChartDashboard />
        </div>
    </div>


</template>
