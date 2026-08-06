/**
 * Capa de simulación (mock services) de los módulos externos.
 * Cada adaptador implementa un puerto de `ports.ts` con latencia simulada.
 */

import {
  documents as seedDocuments,
  invoices as seedInvoices,
  subscriptions as seedSubscriptions,
  tickets as seedTickets,
  usageSeries,
} from "../domain/seed";
import type { Ticket } from "../domain/types";
import { publish } from "./event-bus";
import type { PlatformPorts } from "./ports";

const wait = (ms = 220) => new Promise<void>((r) => setTimeout(r, ms));

let tickets: Ticket[] = seedTickets.map((t) => ({ ...t, mensajes: [...t.mensajes] }));

export const mockPorts: PlatformPorts = {
  subscriptions: {
    async listByTenant() {
      await wait();
      return seedSubscriptions;
    },
    async requestChange(input) {
      await wait();
      const referencia = `SUS-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
      publish("suscripciones.cambio.solicitado", { ...input, referencia }, { emisor: "portal-cliente", tenantId: input.tenantId });
      return { referencia, estado: "recibida" };
    },
  },
  billing: {
    async listInvoices() {
      await wait();
      return seedInvoices;
    },
    async getInvoicePdfUrl(_tenantId, invoiceId) {
      await wait(120);
      return `https://facturacion.mock/api/v1/invoices/${invoiceId}/pdf`;
    },
    async getPaymentMethod() {
      await wait(120);
      return { tipo: "Domiciliación SEPA", detalle: "ES·· 4471", predeterminado: true };
    },
  },
  support: {
    async listTickets() {
      await wait();
      return tickets;
    },
    async createTicket(input) {
      await wait();
      const nuevo: Ticket = {
        id: `tk_${Math.random().toString(36).slice(2, 8)}`,
        referencia: `SOP-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
        asunto: input.asunto,
        aplicacion: input.aplicacion,
        prioridad: input.prioridad,
        estado: "abierta",
        creadaEn: new Date().toISOString(),
        mensajes: [
          { id: "m1", autor: "Tú", interno: false, fecha: new Date().toISOString(), cuerpo: input.cuerpo, adjuntos: [] },
        ],
      };
      tickets = [nuevo, ...tickets];
      publish("soporte.incidencia.creada", nuevo, { emisor: "portal-cliente", tenantId: input.tenantId });
      return nuevo;
    },
    async reply(input) {
      await wait(160);
      tickets = tickets.map((t) =>
        t.id === input.ticketId
          ? {
              ...t,
              estado: "en_curso",
              mensajes: [
                ...t.mensajes,
                {
                  id: `m${t.mensajes.length + 1}`,
                  autor: "Tú",
                  interno: false,
                  fecha: new Date().toISOString(),
                  cuerpo: input.cuerpo,
                  adjuntos: input.adjuntos ?? [],
                },
              ],
            }
          : t,
      );
      return tickets.find((t) => t.id === input.ticketId)!;
    },
  },
  documents: {
    async list() {
      await wait();
      return seedDocuments;
    },
  },
  usage: {
    async series() {
      await wait();
      return usageSeries;
    },
  },
  crm: {
    async notifyProvisioningResult(input) {
      publish("crm.aprovisionamiento.resultado", input, { emisor: "aprovisionamiento", tenantId: input.tenantId });
    },
  },
  audit: {
    async record(input) {
      publish("auditoria.registro", input, { emisor: "core", tenantId: input.tenantId });
    },
  },
  accounting: {
    async postProvisioningEvent(input) {
      publish("contabilidad.apunte.solicitado", input, { emisor: "aprovisionamiento", tenantId: input.tenantId });
    },
  },
};

/** Punto único de inyección: cambiar aquí por los adaptadores reales. */
export const platform: PlatformPorts = mockPorts;
