<template>
    <div class="h-full flex flex-col">
      <Header />
      <NuxtPage class="p-4"/>
      <ClientOnly>
          <AlertDialog :open="showCookieConsent && route.path !== '/conditions'" @update:open="showCookieConsent = $event">
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>Consentement des cookies</AlertDialogTitle>
                      <AlertDialogDescription>
                          Nous utilisons des cookies pour améliorer votre expérience. Pour continuer à utiliser ce site, veuillez accepter notre utilisation de cookies.
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogAction @click="acceptCookies">Accepter</AlertDialogAction>
                      <!--                  <Button @click="acceptCookies">Accepter</Button>-->
                      <NuxtLink to="/conditions">
                          <Button variant="outline">Plus d'informations</Button>
                      </NuxtLink>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
      </ClientOnly>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useCookieConsent } from '~/composables/useCookieConsent'
  import { Button } from '~/components/ui/button'
  import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogAction, AlertDialogFooter } from '~/components/ui/alert-dialog';
  
  const route = useRoute()
  const { showCookieConsent, acceptCookies } = useCookieConsent()
  </script>