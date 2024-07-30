<template>
    <div class="min-h-screen flex flex-col">
      <Header />
      <NuxtPage class="flex-grow p-4"/>
      <ClientOnly>
        <Dialog :open="showCookieConsent && route.path !== '/conditions'" @update:open="showCookieConsent = $event">
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Consentement des cookies</DialogTitle>
              <DialogDescription>
                Nous utilisons des cookies pour améliorer votre expérience. Pour continuer à utiliser ce site, veuillez accepter notre utilisation de cookies.
              </DialogDescription>
            </DialogHeader>
            <div class="flex justify-between mt-4">
              <Button @click="acceptCookies">Accepter</Button>
              <NuxtLink to="/conditions">
                <Button variant="outline">Plus d'informations</Button>
              </NuxtLink>
            </div>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useCookieConsent } from '~/composables/useCookieConsent'
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '~/components/ui/dialog'
  import { Button } from '~/components/ui/button'
  
  const route = useRoute()
  const { showCookieConsent, acceptCookies } = useCookieConsent()
  </script>