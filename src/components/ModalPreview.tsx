import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { Download, Printer, Share2, MessageCircle, Mail, Palette } from 'lucide-react'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface InvoiceData {
  clientName: string
  clientEmail: string
  clientAddress: string
  invoiceNumber: string
  issueDate: string
  dueDate: string
  paymentTerms: string
  notes: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  includeTax: boolean
}

interface ModalPreviewProps {
  isOpen: boolean
  onClose: () => void
  invoiceData: InvoiceData | null
}

type TemplateId = 'classic' | 'modern' | 'minimal' | 'corporate' | 'elegant' | 'colorful' | 'dark' | 'vintage' | 'tech' | 'creative' | 'luxury' | 'nature' | 'futuristic' | 'artistic'

const templates = [
  {
    id: 'classic' as TemplateId,
    name: 'Classique',
    description: 'Design traditionnel et professionnel',
    preview: '📄'
  },
  {
    id: 'modern' as TemplateId,
    name: 'Moderne',
    description: 'Design contemporain avec couleurs vives',
    preview: '✨'
  },
  {
    id: 'minimal' as TemplateId,
    name: 'Minimaliste',
    description: 'Design épuré et simple',
    preview: '⚪'
  },
  {
    id: 'corporate' as TemplateId,
    name: 'Corporate',
    description: 'Design d\'entreprise formel',
    preview: '🏢'
  },
  {
    id: 'elegant' as TemplateId,
    name: 'Élégant',
    description: 'Design raffiné et sophistiqué',
    preview: '💎'
  },
  {
    id: 'colorful' as TemplateId,
    name: 'Coloré',
    description: 'Design vibrant et joyeux',
    preview: '🌈'
  },
  {
    id: 'dark' as TemplateId,
    name: 'Sombre',
    description: 'Design sombre et mystérieux',
    preview: '🌙'
  },
  {
    id: 'vintage' as TemplateId,
    name: 'Vintage',
    description: 'Design rétro et nostalgique',
    preview: '📻'
  },
  {
    id: 'tech' as TemplateId,
    name: 'Tech',
    description: 'Design technologique et futuriste',
    preview: '💻'
  },
  {
    id: 'creative' as TemplateId,
    name: 'Créatif',
    description: 'Design artistique et original',
    preview: '🎨'
  },
  {
    id: 'luxury' as TemplateId,
    name: 'Luxe',
    description: 'Design premium et exclusif',
    preview: '👑'
  },
  {
    id: 'nature' as TemplateId,
    name: 'Nature',
    description: 'Design naturel et organique',
    preview: '🌿'
  },
  {
    id: 'futuristic' as TemplateId,
    name: 'Futuriste',
    description: 'Design avant-gardiste et innovant',
    preview: '🚀'
  },
  {
    id: 'artistic' as TemplateId,
    name: 'Artistique',
    description: 'Design expressif et créatif',
    preview: '🎭'
  }
]

// Template Classique
const ClassicTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* En-tête de la facture */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">FACTURly</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Votre partenaire facturation</p>
        </div>
        <div className="text-left sm:text-right">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">FACTURE</h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">N° {invoiceData.invoiceNumber}</p>
        </div>
      </div>

      <Separator />

      {/* Informations client et facture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-1 sm:pb-2 md:pb-4">
            <CardTitle className="text-sm sm:text-base md:text-lg">Facturé à</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="font-medium text-xs sm:text-sm md:text-base">{invoiceData.clientName}</p>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground break-all">{invoiceData.clientEmail}</p>
              <p className="text-[10px] sm:text-xs md:text-sm whitespace-pre-line">{invoiceData.clientAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1 sm:pb-2 md:pb-4">
            <CardTitle className="text-sm sm:text-base md:text-lg">Détails de la facture</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date d'émission:</span>
                <span className="text-right">{formatDate(invoiceData.issueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date d'échéance:</span>
                <span className="text-right">{formatDate(invoiceData.dueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conditions:</span>
                <span className="text-right">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des articles */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%] text-xs sm:text-sm">Description</TableHead>
                  <TableHead className="w-[15%] text-center text-xs sm:text-sm">Qté</TableHead>
                  <TableHead className="w-[15%] text-right text-xs sm:text-sm">Prix unit.</TableHead>
                  <TableHead className="w-[15%] text-right text-xs sm:text-sm">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceData.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-xs sm:text-sm">
                      <div className="break-words">
                        {item.description || `Article ${index + 1}`}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">{item.quantity}</TableCell>
                    <TableCell className="text-right text-xs sm:text-sm">
                      {item.unitPrice.toFixed(2)} GNF
                    </TableCell>
                    <TableCell className="text-right font-medium text-xs sm:text-sm">
                      {item.total.toFixed(2)} GNF
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Totaux */}
      <div className="flex justify-end">
        <div className="w-full sm:w-80 space-y-1 sm:space-y-2">
          <div className="flex justify-between text-xs sm:text-sm md:text-base">
            <span>Sous-total:</span>
            <span className="font-medium">{invoiceData.subtotal.toFixed(2)} GNF</span>
          </div>
          
          {invoiceData.includeTax && (
            <div className="flex justify-between text-xs sm:text-sm md:text-base">
              <span>TVA (20%):</span>
              <span className="font-medium">{invoiceData.tax.toFixed(2)} GNF</span>
            </div>
          )}
          
          <Separator />
          <div className="flex justify-between text-sm sm:text-base md:text-lg font-bold">
            <span>Total:</span>
            <span>{invoiceData.total.toFixed(2)} GNF</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoiceData.notes && (
        <Card>
          <CardHeader className="pb-1 sm:pb-2 md:pb-4">
            <CardTitle className="text-sm sm:text-base md:text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-[10px] sm:text-xs md:text-sm whitespace-pre-line">{invoiceData.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Pied de page */}
      <div className="text-center text-[10px] sm:text-xs md:text-sm text-muted-foreground py-1 sm:py-2 md:py-4">
        <p>Merci pour votre confiance !</p>
        <p className="hidden sm:block">Pour toute question, contactez-nous à support@facturly.com</p>
        <p className="sm:hidden">Contact: support@facturly.com</p>
      </div>
    </div>
  )
}

// Template Moderne
const ModernTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* En-tête moderne avec gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 md:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">FACTURly</h1>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base">Votre partenaire facturation</p>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">FACTURE</h2>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base">N° {invoiceData.invoiceNumber}</p>
          </div>
        </div>
      </div>

      {/* Informations client et facture avec design moderne */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="bg-blue-50 pb-1 sm:pb-2 md:pb-4">
            <CardTitle className="text-sm sm:text-base md:text-lg text-blue-800">Facturé à</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 sm:pt-3 md:pt-4">
            <div className="space-y-1 sm:space-y-2">
              <p className="font-semibold text-sm sm:text-base md:text-lg">{invoiceData.clientName}</p>
              <p className="text-blue-600 break-all text-xs sm:text-sm md:text-base">{invoiceData.clientEmail}</p>
              <p className="text-gray-600 whitespace-pre-line text-xs sm:text-sm md:text-base">{invoiceData.clientAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="bg-purple-50 pb-1 sm:pb-2 md:pb-4">
            <CardTitle className="text-sm sm:text-base md:text-lg text-purple-800">Détails de la facture</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 sm:pt-3 md:pt-4">
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date d'émission:</span>
                <span className="font-medium">{formatDate(invoiceData.issueDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date d'échéance:</span>
                <span className="font-medium">{formatDate(invoiceData.dueDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conditions:</span>
                <span className="font-medium">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau moderne */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-700">Description</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">Qté</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Prix unit.</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceData.items.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="break-words">
                        {item.description || `Article ${index + 1}`}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {item.unitPrice.toFixed(2)} GNF
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {item.total.toFixed(2)} GNF
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Totaux avec design moderne */}
      <div className="flex justify-end">
        <div className="w-full sm:w-80 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sous-total:</span>
              <span className="font-medium">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-sm">
                <span>TVA (20%):</span>
                <span className="font-medium">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <Separator />
            <div className="flex justify-between text-lg font-bold text-blue-600">
              <span>Total:</span>
              <span>{invoiceData.total.toFixed(2)} GNF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoiceData.notes && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg text-yellow-800">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 whitespace-pre-line">{invoiceData.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Pied de page moderne */}
      <div className="text-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg">
        <p className="font-semibold text-gray-700">Merci pour votre confiance !</p>
        <p className="text-sm text-gray-600">Contact: support@facturly.com</p>
      </div>
    </div>
  )
}

// Template Minimaliste
const MinimalTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto">
      {/* En-tête minimaliste */}
      <div className="text-center border-b pb-4 sm:pb-6 md:pb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-800 mb-1 sm:mb-2">FACTURly</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-600">FACTURE N° {invoiceData.invoiceNumber}</h2>
      </div>

      {/* Informations client et facture - layout simple */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">Facturé à</h3>
          <div className="space-y-1">
            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-900">{invoiceData.clientName}</p>
            <p className="text-xs sm:text-sm text-gray-600 break-all">{invoiceData.clientEmail}</p>
            <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">Détails</h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Émission:</span>
              <span className="text-gray-900">{formatDate(invoiceData.issueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Échéance:</span>
              <span className="text-gray-900">{formatDate(invoiceData.dueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Paiement:</span>
              <span className="text-gray-900">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau minimaliste */}
      <div className="border-t border-b">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-4 text-sm font-medium text-gray-500 uppercase tracking-wide">Description</th>
                <th className="py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wide">Qté</th>
                <th className="py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wide">Prix</th>
                <th className="py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wide">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <div className="break-words text-sm">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="py-4 text-center text-sm">{item.quantity}</td>
                  <td className="py-4 text-right text-sm">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="py-4 text-right text-sm font-medium">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux minimalistes */}
      <div className="flex justify-end">
        <div className="w-full sm:w-64 space-y-1 sm:space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600">Sous-total:</span>
            <span>{invoiceData.subtotal.toFixed(2)} GNF</span>
          </div>
          
          {invoiceData.includeTax && (
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600">TVA (20%):</span>
              <span>{invoiceData.tax.toFixed(2)} GNF</span>
            </div>
          )}
          
          <div className="border-t pt-1 sm:pt-2">
            <div className="flex justify-between text-sm sm:text-base md:text-lg font-medium">
              <span>Total:</span>
              <span>{invoiceData.total.toFixed(2)} GNF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes minimalistes */}
      {invoiceData.notes && (
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600 italic">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page minimaliste */}
      <div className="text-center text-[10px] sm:text-xs text-gray-400 pt-4 sm:pt-6 md:pt-8">
        <p>Merci pour votre confiance</p>
        <p>support@facturly.com</p>
      </div>
    </div>
  )
}

// Template Corporate
const CorporateTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 bg-white">
      {/* En-tête corporate avec bordure */}
      <div className="border-2 border-gray-300 p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">FACTURly</h1>
            <p className="text-xs sm:text-sm text-gray-600">Votre partenaire facturation</p>
            <div className="mt-2 sm:mt-4 text-[10px] sm:text-xs text-gray-500">
              <p>123 Rue de la Facturation</p>
              <p>75001 Paris, France</p>
              <p>Tél: +33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">FACTURE</h2>
            <p className="text-xs sm:text-sm text-gray-600">N° {invoiceData.invoiceNumber}</p>
            <div className="mt-2 sm:mt-4 text-[10px] sm:text-xs text-gray-500">
              <p>Date d'émission: {formatDate(invoiceData.issueDate)}</p>
              <p>Date d'échéance: {formatDate(invoiceData.dueDate)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informations client corporate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <div className="border border-gray-300 p-2 sm:p-3 md:p-4">
          <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase mb-2 sm:mb-3">Facturé à</h3>
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-semibold text-gray-900">{invoiceData.clientName}</p>
            <p className="text-gray-700 break-all">{invoiceData.clientEmail}</p>
            <p className="text-gray-700 whitespace-pre-line">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div className="border border-gray-300 p-2 sm:p-3 md:p-4">
          <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase mb-2 sm:mb-3">Conditions de paiement</h3>
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Échéance:</span>
              <span className="font-medium">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Méthode:</span>
              <span className="font-medium">Virement bancaire</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">IBAN:</span>
              <span className="font-medium text-[10px] sm:text-xs">FR76 1234 5678 9012 3456 7890 123</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau corporate */}
      <div className="border border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-bold text-gray-800 uppercase">Description</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-bold text-gray-800 uppercase">Qté</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-bold text-gray-800 uppercase">Prix unit.</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-bold text-gray-800 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="border-t border-gray-300">
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <div className="break-words text-xs sm:text-sm">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">{item.quantity}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux corporate */}
      <div className="flex justify-end">
        <div className="w-full sm:w-80 border border-gray-300">
          <div className="p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600">Sous-total:</span>
              <span className="font-medium">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">TVA (20%):</span>
                <span className="font-medium">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <div className="border-t border-gray-300 pt-1 sm:pt-2">
              <div className="flex justify-between text-sm sm:text-base font-bold">
                <span>Total TTC:</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes corporate */}
      {invoiceData.notes && (
        <div className="border border-gray-300 p-2 sm:p-3 md:p-4">
          <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase mb-1 sm:mb-2">Notes</h3>
          <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page corporate */}
      <div className="border-t-2 border-gray-300 pt-2 sm:pt-3 md:pt-4 text-center text-[10px] sm:text-xs text-gray-600">
        <p className="font-semibold">FACTURly - Votre partenaire facturation</p>
        <p className="break-words">123 Rue de la Facturation, R.G, conakry | Tél: +224 621 20 61 86 | Email: support@facturly.com</p>
        {/* <p className="mt-2">SIRET: 123 456 789 00012 | RCS Paris B 123 456 789</p> */}
      </div>
    </div>
  )
}

// Template Élégant
const ElegantTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      {/* En-tête élégant */}
      <div className="text-center border-b-2 border-gold-400 pb-8">
        <div className="inline-block border-2 border-gold-400 p-6 rounded-full mb-4">
          <h1 className="text-3xl font-serif text-gray-800">FACTURly</h1>
        </div>
        <h2 className="text-2xl font-light text-gray-700">FACTURE N° {invoiceData.invoiceNumber}</h2>
        <div className="mt-4 text-sm text-gray-600">
          <p>Date d'émission: {formatDate(invoiceData.issueDate)}</p>
          <p>Date d'échéance: {formatDate(invoiceData.dueDate)}</p>
        </div>
      </div>

      {/* Informations client et facture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-400">
          <h3 className="text-lg font-serif text-gray-800 mb-4 border-b border-gray-200 pb-2">Facturé à</h3>
          <div className="space-y-2">
            <p className="text-xl font-medium text-gray-900">{invoiceData.clientName}</p>
            <p className="text-gray-600 break-all">{invoiceData.clientEmail}</p>
            <p className="text-gray-600 whitespace-pre-line">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-400">
          <h3 className="text-lg font-serif text-gray-800 mb-4 border-b border-gray-200 pb-2">Détails de paiement</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Conditions:</span>
              <span className="font-medium">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Méthode:</span>
              <span className="font-medium">Virement bancaire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau élégant */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-serif text-gray-700">Description</th>
                <th className="px-6 py-4 text-center text-sm font-serif text-gray-700">Qté</th>
                <th className="px-6 py-4 text-right text-sm font-serif text-gray-700">Prix unit.</th>
                <th className="px-6 py-4 text-right text-sm font-serif text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="break-words text-sm">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm">{item.quantity}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux élégants */}
      <div className="flex justify-end">
        <div className="w-80 bg-white p-6 rounded-lg shadow-sm border border-gold-200">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sous-total:</span>
              <span className="font-medium">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">TVA (20%):</span>
                <span className="font-medium">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <div className="border-t border-gold-200 pt-3">
              <div className="flex justify-between text-lg font-serif text-gray-800">
                <span>Total:</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes élégantes */}
      {invoiceData.notes && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-400">
          <h3 className="text-lg font-serif text-blue-800 mb-2">Notes</h3>
          <p className="text-blue-700 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page élégant */}
      <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
        <p className="font-serif">Merci pour votre confiance</p>
        <p>support@facturly.com | +224 621 20 61 86</p>
      </div>
    </div>
  )
}

// Template Coloré
const ColorfulTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-3 sm:p-4 md:p-6">
      {/* En-tête coloré */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">FACTURly</h1>
            <p className="text-pink-100 text-sm sm:text-base md:text-lg">Votre partenaire facturation</p>
          </div>
          <div className="text-center sm:text-right">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">FACTURE</h2>
            <p className="text-pink-100 text-sm sm:text-base">N° {invoiceData.invoiceNumber}</p>
          </div>
        </div>
      </div>

      {/* Informations client et facture colorées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 sm:p-4 md:p-6 rounded-xl border-2 border-yellow-300">
          <h3 className="text-sm sm:text-base md:text-xl font-bold text-orange-800 mb-2 sm:mb-3 md:mb-4">🌞 Facturé à</h3>
          <div className="space-y-1 sm:space-y-2">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{invoiceData.clientName}</p>
            <p className="text-orange-700 break-all text-xs sm:text-sm md:text-base">{invoiceData.clientEmail}</p>
            <p className="text-orange-700 whitespace-pre-line text-xs sm:text-sm md:text-base">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-teal-100 p-3 sm:p-4 md:p-6 rounded-xl border-2 border-green-300">
          <h3 className="text-sm sm:text-base md:text-xl font-bold text-green-800 mb-2 sm:mb-3 md:mb-4">📅 Détails</h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Émission:</span>
              <span className="font-semibold">{formatDate(invoiceData.issueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Échéance:</span>
              <span className="font-semibold">{formatDate(invoiceData.dueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Paiement:</span>
              <span className="font-semibold">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau coloré */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-purple-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Description</th>
                <th className="px-4 py-3 text-center font-bold">Qté</th>
                <th className="px-4 py-3 text-right font-bold">Prix unit.</th>
                <th className="px-4 py-3 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-pink-50' : 'bg-purple-50'} hover:bg-yellow-100`}>
                  <td className="px-4 py-3">
                    <div className="break-words text-sm font-medium">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux colorés */}
      <div className="flex justify-end">
        <div className="w-80 bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl border-2 border-blue-300">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-800">Sous-total:</span>
              <span className="font-bold text-blue-900">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-sm">
                <span className="text-blue-800">TVA (20%):</span>
                <span className="font-bold text-blue-900">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <div className="border-t-2 border-blue-300 pt-2">
              <div className="flex justify-between text-xl font-bold text-purple-800">
                <span>Total:</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes colorées */}
      {invoiceData.notes && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-2 border-yellow-300">
          <h3 className="text-lg font-bold text-orange-800 mb-2">💬 Notes</h3>
          <p className="text-orange-700 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page coloré */}
      <div className="text-center bg-gradient-to-r from-pink-200 to-purple-200 p-4 rounded-xl">
        <p className="font-bold text-purple-800 text-lg">Merci pour votre confiance ! 🎉</p>
        <p className="text-purple-600">support@facturly.com</p>
      </div>
    </div>
  )
}

// Template Sombre
const DarkTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
// template sombre
    // Template 4: Design géométrique rouge
<div className="bg-gray-200 min-h-screen flex items-center justify-center p-2 sm:p-4">
  <div className="bg-white w-full max-w-2xl shadow-2xl relative overflow-hidden mx-2 sm:mx-0">
    {/* Top Left Geometric Design - Responsive */}
    <div className="absolute top-0 left-0 w-60 sm:w-80 h-60 sm:h-80">
      {/* Dark triangle */}
      <div className="absolute top-0 left-0 w-24 sm:w-40 h-24 sm:h-40 bg-slate-700" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
      
      {/* Gray diamond */}
      <div className="absolute top-4 sm:top-8 left-12 sm:left-20 w-10 sm:w-16 h-10 sm:h-16 bg-gray-400 transform rotate-45"></div>
      
      {/* Red diamond with INVOICE text */}
      <div className="absolute top-8 sm:top-16 left-16 sm:left-32 w-20 sm:w-32 h-20 sm:h-32 bg-red-500 transform rotate-45 flex items-center justify-center">
        <span className="text-white font-bold text-sm sm:text-lg transform -rotate-45">FACTURE</span>
      </div>
    </div>

    {/* Bottom Right Geometric Elements - Responsive */}
    <div className="absolute bottom-0 right-0">
      {/* Red triangle */}
      <div className="w-12 sm:w-20 h-12 sm:h-20 bg-red-500" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
    </div>
    
    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8">
      {/* Dark triangle */}
      <div className="w-10 sm:w-16 h-10 sm:h-16 bg-slate-700" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
    </div>

    {/* Main Content */}
    <div className="relative z-10 p-4 sm:p-6 lg:p-8 pt-16 sm:pt-20">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/2">
          {/* Empty space for geometric design on desktop, content on mobile */}
          <div className="block sm:hidden">
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-1">Facture#</div>
              <div className="text-sm text-gray-600">N° {invoiceData.invoiceNumber}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-1">Date</div>
              <div className="text-sm text-gray-600">{formatDate(invoiceData.issueDate)}</div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <div className="hidden sm:block mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-1">Facture#</div>
            <div className="text-sm text-gray-600">N° {invoiceData.invoiceNumber}</div>
          </div>
          <div className="hidden sm:block mb-6">
            <div className="text-sm font-semibold text-gray-700 mb-1">Date</div>
            <div className="text-sm text-gray-600">{formatDate(invoiceData.issueDate)}</div>
          </div>
          
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Facturé à:</div>
            <div className="text-sm text-gray-800 font-medium break-words">{invoiceData.clientName}</div>
            <div className="text-xs text-gray-600 leading-relaxed space-y-1">
              <div className="break-words">{invoiceData.clientEmail}</div>
              <div className="break-words">{invoiceData.clientAddress}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table - Version Desktop et Tablette */}
      <div className="hidden sm:block mb-6 sm:mb-8">
        {/* Table Header */}
        <div className="bg-red-500 text-white">
          <div className="flex py-3 px-4 text-sm font-medium">
            <div className="w-12">Nº</div>
            <div className="flex-1">Description</div>
            <div className="w-20 text-center">Qté</div>
            <div className="w-20 text-center">Prix unit.</div>
            <div className="w-20 text-right">Total</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="bg-gray-50">
          {invoiceData.items.map((item, index) => (
            <div key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} flex py-3 px-4 border-b border-gray-200 text-sm`}>
              <div className="w-12 text-gray-600">{index + 1}</div>
              <div className="flex-1 text-gray-800 break-words">{item.description || `Article ${index + 1}`}</div>
              <div className="w-20 text-center text-gray-800">{item.quantity}</div>
              <div className="w-20 text-center text-gray-800">{item.unitPrice.toFixed(2)} GNF</div>
              <div className="w-20 text-right text-gray-800">{item.total.toFixed(2)} GNF</div>
            </div>
          ))}

          {/* Empty rows pour maintenir l'espacement */}
          <div className="flex py-3 px-4 border-b border-gray-200 text-sm">
            <div className="w-12"></div>
            <div className="flex-1"></div>
            <div className="w-20 text-center"></div>
            <div className="w-20 text-center"></div>
            <div className="w-20 text-right"></div>
          </div>
          <div className="flex py-3 px-4 border-b border-gray-200 text-sm bg-white">
            <div className="w-12"></div>
            <div className="flex-1"></div>
            <div className="w-20 text-center"></div>
            <div className="w-20 text-center"></div>
            <div className="w-20 text-right"></div>
          </div>
        </div>
      </div>

      {/* Items List - Version Mobile */}
      <div className="block sm:hidden mb-6 sm:mb-8">
        <div className="bg-red-500 text-white px-4 py-3">
          <h3 className="text-sm font-medium">ARTICLES</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {invoiceData.items.map((item, index) => (
            <div key={item.id} className={`px-4 py-4 text-sm ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-800 flex-1 break-words mr-2">
                  <span className="text-xs text-gray-500 mr-2">#{index + 1}</span>
                  {item.description || `Article ${index + 1}`}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Qté:</span> {item.quantity}
                </div>
                <div>
                  <span className="font-medium">Prix:</span> {item.unitPrice.toFixed(2)} GNF
                </div>
                <div className="text-right">
                  <span className="font-medium">Total:</span> {item.total.toFixed(2)} GNF
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section - Responsive */}
      <div className="flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0">
        {/* Left Side - Payment Info and Terms */}
        <div className="w-full lg:w-1/2 lg:pr-8">
          <div className="mb-4 sm:mb-6">
            <div className="text-sm font-semibold text-red-500 mb-2">Payment Info:</div>
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span>Nom</span>
                <span className="sm:ml-2 break-words">Abcdef</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span>Nº Compte:</span>
                <span className="sm:ml-2">123456789</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span>Details de la Banque:</span>
                <span className="sm:ml-2">Ecobank</span>
              </div>
            </div>
          </div>
          {invoiceData.notes && (
            <div>
              <div className="text-sm font-semibold text-red-500 mb-2">Note</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                <p className="break-words">{invoiceData.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Totals */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-50 p-4 rounded-lg lg:bg-transparent lg:p-0">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Sous-Total:</span>
                <span className="text-gray-800 font-medium">{invoiceData.subtotal.toFixed(2)} GNF</span>
              </div>
              {invoiceData.includeTax && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tax(18%):</span>
                  <span className="text-gray-800 font-medium">{invoiceData.tax.toFixed(2)} GNF</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between text-base sm:text-lg font-semibold">
                  <span className="text-red-500">Total:</span>
                  <span className="text-red-500">{invoiceData.total.toFixed(2)} GNF</span>
                </div>
              </div>
            </div>

            <div className="text-left mb-4 sm:mb-8">
              <div className="text-sm text-gray-600">Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

// Template Vintage
const VintageTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-6 bg-amber-50 p-6 border-4 border-amber-200">
      {/* En-tête vintage */}
      <div className="text-center border-4 border-amber-800 bg-amber-100 p-6">
        <div className="border-2 border-amber-800 p-4 inline-block mb-4">
          <h1 className="text-4xl font-serif text-amber-900">FACTURly</h1>
        </div>
        <h2 className="text-2xl font-bold text-amber-800">FACTURE N° {invoiceData.invoiceNumber}</h2>
        <div className="mt-4 text-amber-700">
          <p>Date d'émission: {formatDate(invoiceData.issueDate)}</p>
          <p>Date d'échéance: {formatDate(invoiceData.dueDate)}</p>
        </div>
      </div>

      {/* Informations client et facture vintage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-amber-100 border-2 border-amber-800 p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-4 border-b-2 border-amber-800 pb-2">Facturé à</h3>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-amber-900">{invoiceData.clientName}</p>
            <p className="text-amber-800 break-all">{invoiceData.clientEmail}</p>
            <p className="text-amber-800 whitespace-pre-line">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div className="bg-amber-100 border-2 border-amber-800 p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-4 border-b-2 border-amber-800 pb-2">Détails</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-amber-800">Paiement:</span>
              <span className="font-semibold text-amber-900">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau vintage */}
      <div className="bg-amber-100 border-2 border-amber-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-200">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-amber-900 border-r border-amber-800">Description</th>
                <th className="px-4 py-3 text-center font-bold text-amber-900 border-r border-amber-800">Qté</th>
                <th className="px-4 py-3 text-right font-bold text-amber-900 border-r border-amber-800">Prix unit.</th>
                <th className="px-4 py-3 text-right font-bold text-amber-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="border-b border-amber-800">
                  <td className="px-4 py-3 border-r border-amber-800">
                    <div className="break-words text-sm text-amber-900">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-amber-900 border-r border-amber-800">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-sm text-amber-900 border-r border-amber-800">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-amber-900">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux vintage */}
      <div className="flex justify-end">
        <div className="w-80 bg-amber-100 border-2 border-amber-800 p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-amber-800">Sous-total:</span>
              <span className="font-bold text-amber-900">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-sm">
                <span className="text-amber-800">TVA (20%):</span>
                <span className="font-bold text-amber-900">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <div className="border-t-2 border-amber-800 pt-2">
              <div className="flex justify-between text-xl font-bold text-amber-900">
                <span>Total:</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes vintage */}
      {invoiceData.notes && (
        <div className="bg-amber-100 border-2 border-amber-800 p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-2">Notes</h3>
          <p className="text-amber-800 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page vintage */}
      <div className="text-center bg-amber-200 border-2 border-amber-800 p-4">
        <p className="font-bold text-amber-900 text-lg">Merci pour votre confiance !</p>
        <p className="text-amber-800">support@facturly.com</p>
      </div>
    </div>
  )
}

// Template Tech
const TechTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (

    
    <div className="min-h-screen bg-gray-400 p-2 sm:p-4 lg:p-8 flex items-center justify-center">
  <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden relative mx-2 sm:mx-0">
    {/* Decorative Background Shapes - Réduits sur mobile */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top gradient blob */}
      <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-full opacity-80 blur-sm transform rotate-12"></div>
      <div className="absolute top-5 sm:top-10 -left-5 sm:-left-10 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-60"></div>
      
      {/* Bottom gradient blobs */}
      <div className="absolute -bottom-16 sm:-bottom-32 -left-10 sm:-left-20 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tr from-purple-500 via-pink-400 to-orange-400 rounded-full opacity-70"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-16 sm:right-32 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-60"></div>
      <div className="absolute bottom-20 sm:bottom-40 right-5 sm:right-10 w-10 sm:w-20 h-10 sm:h-20 bg-purple-500 rounded-full opacity-70"></div>
    </div>

    {/* Content */}
    <div className="relative z-10">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-auto">
            <div className="flex items-center mb-4">
              <div className="grid grid-cols-3 gap-1 mr-3">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-400 rounded-full"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-400 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">LOGO</h1>
                <p className="text-xs sm:text-sm text-white opacity-80">ENTREPRISE</p>
              </div>
            </div>
            <div className="text-white text-sm space-y-1 opacity-90">
              <p className='text-lg sm:text-xl md:text-2xl font-bold'>FACTURE</p>
              <h3 className='text-xs sm:text-sm md:text-base'>N° {invoiceData.invoiceNumber}</h3>
            </div>
          </div>
        </div>

        {/* Invoice Details - Responsive grid */}
        <div className="bg-white bg-opacity-90 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Facturé à</h3>
              <div className="text-sm text-gray-700">
                <p className="font-medium break-words">{invoiceData.clientName}</p>
                <p className="break-words">{invoiceData.clientEmail}</p>
                <p className="break-words">{invoiceData.clientAddress}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Émission:</h3>
              <div className="text-sm text-gray-700">
                <p>{formatDate(invoiceData.issueDate)}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Échéance:</h3>
              <div className="text-sm text-gray-700">
                <p>{formatDate(invoiceData.dueDate)}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Paiement:</h3>
              <div className="text-sm text-gray-700">
                <p className="break-words">{getPaymentTermsText(invoiceData.paymentTerms)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table - Version Desktop et Tablette */}
        <div className="hidden sm:block bg-white bg-opacity-90 rounded-xl overflow-hidden mb-4 sm:mb-6">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 text-white px-4 sm:px-6 py-4">
            <div className="grid grid-cols-12 gap-2 sm:gap-4 text-sm font-medium">
              <div className="col-span-5">DESCRIPTION</div>
              <div className="col-span-2 text-center">Qté</div>
              <div className="col-span-2 text-center">Prix unit.</div>
              <div className="col-span-3 text-right">TOTAL</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {invoiceData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-3 text-sm">
                <div className="col-span-5 text-gray-800 break-words">{item.description || `Article ${index + 1}`}</div>
                <div className="col-span-2 text-center text-gray-700">{item.quantity}</div>
                <div className="col-span-2 text-center text-gray-700">{item.unitPrice.toFixed(2)} GNF</div>
                <div className="col-span-3 text-right font-medium text-gray-800">{item.total.toFixed(2)} GNF</div>
              </div>
            ))}
          </div>
        </div>

        {/* Items List - Version Mobile */}
        <div className="block sm:hidden bg-white bg-opacity-90 rounded-xl overflow-hidden mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 text-white px-4 py-3">
            <h3 className="text-sm font-medium">ARTICLES</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {invoiceData.items.map((item, index) => (
              <div key={item.id} className="px-4 py-4 text-sm">
                <div className="font-medium text-gray-800 mb-2 break-words">
                  {item.description || `Article ${index + 1}`}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Qté:</span> {item.quantity}
                  </div>
                  <div>
                    <span className="font-medium">Prix:</span> {item.unitPrice.toFixed(2)} GNF
                  </div>
                  <div className="text-right">
                    <span className="font-medium">Total:</span> {item.total.toFixed(2)} GNF
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals - Responsive */}
        <div className="bg-white bg-opacity-90 rounded-xl px-4 sm:px-6 py-4 mb-4 sm:mb-6">
          <div className="flex justify-end">
            <div className="w-full sm:w-80 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">{invoiceData.subtotal.toFixed(2)} GNF</span>
              </div>

              {invoiceData.tax && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">{invoiceData.tax.toFixed(2)} GNF</span>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-3 rounded-full flex justify-between font-bold">
                <span>Total</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Payment Method */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-400 text-white p-4 sm:p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-80"></div>
            
            {invoiceData.notes && (
              <div className="mb-4">
                <h4 className="text-sm font-bold mb-2">Note:</h4>
                <p className="text-xs opacity-90 leading-relaxed break-words">
                  {invoiceData.notes}
                </p>
              </div>
            )}
            
            <h3 className="text-base sm:text-lg font-bold mb-4">Méthode Paiement</h3>
            <div className="text-xs sm:text-sm space-y-2 opacity-90">
              <div className="break-words">
                <span className="font-medium">Nº Compte</span> : 0000 0000 0000 0000
              </div>
              <div className="break-words">
                <span className="font-medium">Nom</span> : abcdefghijklmn
              </div>
              <div className="break-words">
                <span className="font-medium">Banque</span> : XYZ Banque
              </div>
            </div>
          </div>

          {/* Authorized Sign */}
          <div className="bg-white bg-opacity-60 p-4 sm:p-6 rounded-xl flex items-end justify-end min-h-32">
            <div className="text-right">
              <div className="text-xs sm:text-sm text-gray-600 mb-8 sm:mb-16">Authorized Sign</div>
              <div className="w-24 sm:w-32 h-px bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

// Template Créatif
const CreativeTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-4 md:p-6">
      {/* En-tête créatif */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-white opacity-10 rounded-full -translate-y-8 sm:-translate-y-12 md:-translate-y-16 translate-x-8 sm:translate-x-12 md:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 bg-white opacity-10 rounded-full translate-y-6 sm:translate-y-9 md:translate-y-12 -translate-x-6 sm:-translate-x-9 md:-translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">FACTURly</h1>
              <p className="text-indigo-100 text-sm sm:text-base md:text-lg">Votre partenaire facturation</p>
            </div>
            <div className="text-center sm:text-right">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">FACTURE</h2>
              <p className="text-indigo-100 text-sm sm:text-base">N° {invoiceData.invoiceNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informations client et facture créatives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 sm:p-4 md:p-6 rounded-2xl border-4 border-yellow-300 shadow-lg transform rotate-1">
          <h3 className="text-sm sm:text-base md:text-xl font-bold text-orange-800 mb-2 sm:mb-3 md:mb-4">🎨 Facturé à</h3>
          <div className="space-y-1 sm:space-y-2">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{invoiceData.clientName}</p>
            <p className="text-orange-700 break-all text-xs sm:text-sm md:text-base">{invoiceData.clientEmail}</p>
            <p className="text-orange-700 whitespace-pre-line text-xs sm:text-sm md:text-base">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-teal-100 p-3 sm:p-4 md:p-6 rounded-2xl border-4 border-green-300 shadow-lg transform -rotate-1">
          <h3 className="text-sm sm:text-base md:text-xl font-bold text-green-800 mb-2 sm:mb-3 md:mb-4">📅 Détails</h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Émission:</span>
              <span className="font-semibold">{formatDate(invoiceData.issueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Échéance:</span>
              <span className="font-semibold">{formatDate(invoiceData.dueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Paiement:</span>
              <span className="font-semibold">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau créatif */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-purple-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Description</th>
                <th className="px-4 py-3 text-center font-bold">Qté</th>
                <th className="px-4 py-3 text-right font-bold">Prix unit.</th>
                <th className="px-4 py-3 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gradient-to-r from-pink-50 to-purple-50' : 'bg-gradient-to-r from-indigo-50 to-blue-50'} hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100`}>
                  <td className="px-4 py-3">
                    <div className="break-words text-sm font-medium">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux créatifs */}
      <div className="flex justify-end">
        <div className="w-80 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl border-4 border-indigo-300 shadow-lg">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-indigo-800">Sous-total:</span>
              <span className="font-bold text-indigo-900">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-sm">
                <span className="text-indigo-800">TVA (20%):</span>
                <span className="font-bold text-indigo-900">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <div className="border-t-2 border-indigo-300 pt-2">
              <div className="flex justify-between text-xl font-bold text-purple-800">
                <span>Total:</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes créatives */}
      {invoiceData.notes && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-4 border-yellow-300 shadow-lg">
          <h3 className="text-lg font-bold text-orange-800 mb-2">💬 Notes</h3>
          <p className="text-orange-700 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page créatif */}
      <div className="text-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6 rounded-2xl shadow-lg">
        <p className="font-bold text-purple-800 text-xl">Merci pour votre confiance ! 🎉</p>
        <p className="text-purple-600">support@facturly.com</p>
      </div>
    </div>
  )
}

// Template Luxe
const LuxuryTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-100 to-gray-200 p-8">
      {/* En-tête luxe */}
      <div className="text-center border-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 p-8 shadow-2xl">
        <div className="inline-block border-4 border-yellow-400 p-6 rounded-full mb-6 bg-gradient-to-r from-yellow-100 to-amber-100">
          <h1 className="text-5xl font-serif text-yellow-800">FACTURly</h1>
        </div>
        <h2 className="text-3xl font-light text-yellow-700">FACTURE N° {invoiceData.invoiceNumber}</h2>
        <div className="mt-6 text-yellow-600">
          <p>Date d'émission: {formatDate(invoiceData.issueDate)}</p>
          <p>Date d'échéance: {formatDate(invoiceData.dueDate)}</p>
        </div>
      </div>

      {/* Informations client et facture luxe */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-lg shadow-xl border-4 border-yellow-300">
          <h3 className="text-2xl font-serif text-yellow-800 mb-6 border-b-4 border-yellow-400 pb-3">Facturé à</h3>
          <div className="space-y-3">
            <p className="text-2xl font-medium text-yellow-900">{invoiceData.clientName}</p>
            <p className="text-yellow-700 break-all text-lg">{invoiceData.clientEmail}</p>
            <p className="text-yellow-700 whitespace-pre-line text-lg">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-lg shadow-xl border-4 border-yellow-300">
          <h3 className="text-2xl font-serif text-yellow-800 mb-6 border-b-4 border-yellow-400 pb-3">Détails de paiement</h3>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span className="text-yellow-700">Conditions:</span>
              <span className="font-semibold text-yellow-900">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-700">Méthode:</span>
              <span className="font-semibold text-yellow-900">Virement bancaire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau luxe */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg shadow-xl overflow-hidden border-4 border-yellow-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-yellow-200 to-amber-200">
              <tr>
                <th className="px-8 py-6 text-left text-lg font-serif text-yellow-800">Description</th>
                <th className="px-8 py-6 text-center text-lg font-serif text-yellow-800">Qté</th>
                <th className="px-8 py-6 text-right text-lg font-serif text-yellow-800">Prix unit.</th>
                <th className="px-8 py-6 text-right text-lg font-serif text-yellow-800">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="border-b-2 border-yellow-200 hover:bg-yellow-100">
                  <td className="px-8 py-6">
                    <div className="break-words text-lg">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-lg">{item.quantity}</td>
                  <td className="px-8 py-6 text-right text-lg">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="px-8 py-6 text-right text-lg font-semibold">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux luxe */}
      <div className="flex justify-end">
        <div className="w-96 bg-gradient-to-r from-yellow-100 to-amber-100 p-8 rounded-lg shadow-xl border-4 border-yellow-300">
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-yellow-700">Sous-total:</span>
              <span className="font-semibold text-yellow-900">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-lg">
                <span className="text-yellow-700">TVA (20%):</span>
                <span className="font-semibold text-yellow-900">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <div className="border-t-4 border-yellow-400 pt-4">
              <div className="flex justify-between text-2xl font-serif text-yellow-800">
                <span>Total:</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes luxe */}
      {invoiceData.notes && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-xl border-4 border-blue-300">
          <h3 className="text-2xl font-serif text-blue-800 mb-4">Notes</h3>
          <p className="text-blue-700 whitespace-pre-line text-lg">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page luxe */}
      <div className="text-center text-lg text-yellow-600 pt-8 border-t-4 border-yellow-400">
        <p className="font-serif text-2xl">Merci pour votre confiance</p>
        <p className="text-xl">support@facturly.com | +224 621 20 61 86</p>
      </div>
    </div>
  )
}

// Template Nature
const NatureTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      {/* En-tête nature */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">🌿 FACTURly</h1>
            <p className="text-green-100 text-lg">Votre partenaire facturation</p>
          </div>
          <div className="text-center sm:text-right">
            <h2 className="text-3xl font-bold">FACTURE</h2>
            <p className="text-green-100">N° {invoiceData.invoiceNumber}</p>
          </div>
        </div>
      </div>

      {/* Informations client et facture nature */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300">
          <h3 className="text-xl font-bold text-green-800 mb-4">🌱 Facturé à</h3>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900">{invoiceData.clientName}</p>
            <p className="text-green-700 break-all">{invoiceData.clientEmail}</p>
            <p className="text-green-700 whitespace-pre-line">{invoiceData.clientAddress}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-6 rounded-xl border-2 border-emerald-300">
          <h3 className="text-xl font-bold text-emerald-800 mb-4">🌿 Détails</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-700">Émission:</span>
              <span className="font-semibold">{formatDate(invoiceData.issueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-700">Échéance:</span>
              <span className="font-semibold">{formatDate(invoiceData.dueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-700">Paiement:</span>
              <span className="font-semibold">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau nature */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-400 to-emerald-400 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Description</th>
                <th className="px-4 py-3 text-center font-bold">Qté</th>
                <th className="px-4 py-3 text-right font-bold">Prix unit.</th>
                <th className="px-4 py-3 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-green-50' : 'bg-emerald-50'} hover:bg-green-100`}>
                  <td className="px-4 py-3">
                    <div className="break-words text-sm font-medium">
                      {item.description || `Article ${index + 1}`}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    {item.unitPrice.toFixed(2)} GNF
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold">
                    {item.total.toFixed(2)} GNF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux nature */}
      <div className="flex justify-end">
        <div className="w-80 bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-800">Sous-total:</span>
              <span className="font-bold text-green-900">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            
            {invoiceData.includeTax && (
              <div className="flex justify-between text-sm">
                <span className="text-green-800">TVA (20%):</span>
                <span className="font-bold text-green-900">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            
            <div className="border-t-2 border-green-300 pt-2">
              <div className="flex justify-between text-xl font-bold text-emerald-800">
                <span>Total:</span>
                <span>{invoiceData.total.toFixed(2)} GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes nature */}
      {invoiceData.notes && (
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300">
          <h3 className="text-lg font-bold text-green-800 mb-2">🌿 Notes</h3>
          <p className="text-green-700 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}

      {/* Pied de page nature */}
      <div className="text-center bg-gradient-to-r from-green-200 to-emerald-200 p-4 rounded-xl">
        <p className="font-bold text-green-800 text-lg">Merci pour votre confiance ! 🌱</p>
        <p className="text-green-600">support@facturly.com</p>
      </div>
    </div>
  )
}

// Template Futuriste
const FuturisticTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 p-2 sm:p-4 lg:p-6 flex items-center justify-center">
  <div className="w-full max-w-4xl bg-gray-100 shadow-2xl rounded-lg overflow-hidden mx-2 sm:mx-0">
    {/* Header */}
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-6 sm:w-8 h-6 sm:h-8 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Logo</h1>
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-600">Entreprise</h2>
          </div>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">FACTURE</h1>
          <p className="text-gray-600">N° {invoiceData.invoiceNumber}</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <div>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-semibold">Adresse du client</p>
            <p className="break-words">{invoiceData.clientName}</p>
            <p className="break-words">{invoiceData.clientEmail}</p>
            <p className="pt-2 break-words">{invoiceData.clientAddress}</p>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-semibold">Détails de la facture :</p>
            <div className="flex flex-wrap gap-1">
              <span className="text-gray-600">Émission:</span>
              <span className="text-black font-semibold">{formatDate(invoiceData.issueDate)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-gray-600">Échéance:</span>
              <span className="text-black font-semibold">{formatDate(invoiceData.dueDate)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-gray-600">Paiement:</span>
              <span className="text-black font-semibold break-words">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Items Table - Version Desktop et Tablette */}
    <div className="bg-white">
      <div className="hidden sm:block">
        {/* Table Header */}
        <div className="bg-indigo-600 text-white px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-12 gap-2 sm:gap-4 text-sm font-medium">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Qté</div>
            <div className="col-span-2 text-center">Prix</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="px-4 sm:px-6 lg:px-8">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 sm:gap-4 py-4 border-b border-gray-200 text-sm">
              <div className="col-span-6">
                <p className="font-medium text-gray-800 mb-1 break-words">{item.description || `Article ${index + 1}`}</p>
              </div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-center">{item.unitPrice.toFixed(2)} GNF</div>
              <div className="col-span-2 text-right font-medium">{item.total.toFixed(2)} GNF</div>
            </div>
          ))}
        </div>
      </div>

      {/* Items List - Version Mobile */}
      <div className="block sm:hidden">
        <div className="bg-indigo-600 text-white px-4 py-3">
          <h3 className="text-sm font-medium">ARTICLES</h3>
        </div>
        <div className="divide-y divide-gray-200 px-4">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="py-4 text-sm">
              <div className="font-medium text-gray-800 mb-2 break-words">
                {item.description || `Article ${index + 1}`}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div>
                  <span className="font-medium">Qté:</span> {item.quantity}
                </div>
                <div>
                  <span className="font-medium">Prix:</span> {item.unitPrice.toFixed(2)} GNF
                </div>
                <div className="text-right">
                  <span className="font-medium">Total:</span> {item.total.toFixed(2)} GNF
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-end">
          <div className="w-full sm:w-80 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">SOUS-TOTAL :</span>
              <span className="font-medium">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
            {invoiceData.includeTax && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax VAT 18% :</span>
                <span className="font-medium">{invoiceData.tax.toFixed(2)} GNF</span>
              </div>
            )}
            <div className="bg-indigo-600 text-white px-4 py-3 rounded flex justify-between">
              <span className="font-bold">TOTAL :</span>
              <span className="font-bold text-lg">{invoiceData.total.toFixed(2)} GNF</span>
            </div>
          </div>
        </div>

        {/* Note */}
        {invoiceData.notes && (
          <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">
            <p className="font-semibold text-gray-800 mb-2">Note:</p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-full sm:max-w-2xl break-words">
              {invoiceData.notes}
            </p>
          </div>
        )}

        {/* Thank you */}
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-indigo-600">Merci pour votre confiance</h3>
          <div className="w-full h-px bg-indigo-300 mt-4"></div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Questions?</h4>
            <div className="text-gray-600 space-y-1">
              <p className="break-words">Email: company@yourbusiness</p>
              <p>Contact : +224 00 00 00 00</p>
            </div>
          </div>
          {/* <div>
            <h4 className="font-semibold text-gray-800 mb-2">Payment Info :</h4>
            <div className="text-gray-600 space-y-1">
              <p>Account : 1234 567 890</p>
              <p className="break-words">A/C Name : Robert Sopanin</p>
              <p>Bank Detail : Bank Prakash</p>
            </div>
          </div> 
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Terms & Conditions/Note:</h4>
            <div className="text-gray-600 space-y-1">
              <p className="text-xs leading-relaxed break-words">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </div>
</div>
 )

}

// Template Artistique
const ArtisticTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentTermsText = (terms: string) => {
    switch (terms) {
      case 'immediate': return 'Paiement immédiat'
      case '15': return '15 jours'
      case '30': return '30 jours'
      case '45': return '45 jours'
      case '60': return '60 jours'
      default: return `${terms} jours`
    }
  }

  return (
    // Template 3: Design géométrique
<div className="bg-gray-200 min-h-screen flex items-center justify-center p-2 sm:p-4">
  <div className="bg-white w-full max-w-4xl shadow-xl mx-2 sm:mx-0" style={{ minHeight: '800px' }}>
    {/* Header with geometric design */}
    <div className="relative h-24 sm:h-32 overflow-hidden">
      {/* Geometric shapes - Responsive */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 w-60 sm:w-80 h-full bg-slate-700" style={{ clipPath: 'polygon(0 0, 60% 0, 45% 100%, 0% 100%)' }}></div>
        <div className="absolute left-40 sm:left-60 top-0 w-60 sm:w-80 h-full bg-teal-600" style={{ clipPath: 'polygon(0 0, 55% 0, 40% 100%, 0% 100%)' }}></div>
        <div className="absolute left-60 sm:left-80 top-0 w-60 sm:w-80 h-full bg-teal-400" style={{ clipPath: 'polygon(0 0, 50% 0, 35% 100%, 0% 100%)' }}></div>
        <div className="absolute right-0 top-0 w-20 sm:w-40 h-full bg-gray-200" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      </div>
      
      {/* Company Logo */}
      <div className="absolute left-4 sm:left-8 top-4 sm:top-6 z-10">
        <div className="text-white">
          <div className="text-2xl sm:text-3xl font-bold mb-1">CN</div>
          <div className="text-xs tracking-wider">COMPANY NAME</div>
        </div>
      </div>

      {/* Invoice Title */}
      <div className="absolute right-4 sm:right-8 top-6 sm:top-8 z-10">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">FACTURE</h1>
      </div>
    </div>

    {/* Main Content */}
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Client and Date Information */}
      <div className="flex flex-col lg:flex-row justify-between mb-6 sm:mb-8 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: 'cursive' }}>Informations du client</h3>
          <div className="text-xs text-gray-600 leading-relaxed space-y-1">
            <div className="break-words">{invoiceData.clientName}</div>
            <div className="break-words">{invoiceData.clientEmail}</div>
            <div className="break-words">{invoiceData.clientAddress}</div>
          </div>
        </div>
        
        <div className="text-left lg:text-right w-full lg:w-auto">
          <div className="mb-3">
            <div className="text-lg sm:text-xl font-semibold text-gray-700 mb-1" style={{ fontFamily: 'cursive' }}>Détails</div>
            
            <div className="flex flex-col space-y-1">
              <div className="flex flex-wrap justify-start lg:justify-end gap-1">
                <span className="text-xs">Date d'émission:</span>
                <span className="text-xs text-gray-600">{formatDate(invoiceData.issueDate)}</span>
              </div>
              
              <div className="flex flex-wrap justify-start lg:justify-end gap-1">
                <span className="text-xs">Date d'échéance:</span>
                <span className="text-xs text-gray-600">{formatDate(invoiceData.dueDate)}</span>
              </div>
              
              <div className="flex flex-wrap justify-start lg:justify-end gap-1">
                <span className="text-xs">Paiement:</span>
                <span className="text-xs text-gray-600 break-words">{getPaymentTermsText(invoiceData.paymentTerms)}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1">Numéro de facture</div>
            <div className="text-xs text-gray-600">N° {invoiceData.invoiceNumber}</div>
          </div>
        </div>
      </div>

      {/* Items Table - Version Desktop et Tablette */}
      <div className="hidden md:block mb-6 sm:mb-8">
        {/* Table Header */}
        <div className="bg-teal-600 text-white">
          <div className="flex py-3 px-4 text-xs font-semibold">
            <div className="w-12">Nº</div>
            <div className="flex-1">Description</div>
            <div className="w-20 text-center">Qté</div>
            <div className="w-16 text-center">Prix unit.</div>
            <div className="w-20 text-right">Total</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="bg-gray-50">
          {invoiceData.items.map((item, index) => (
            <div
              key={item.id}
              className={`flex py-4 px-4 border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="w-12 text-xs text-gray-600">{String(index + 1).padStart(2, '0')}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 mb-1 break-words">
                  {item.description || `Article ${index + 1}`}
                </div>
              </div>
              <div className="w-20 text-center text-xs text-gray-600">{item.quantity}</div>
              <div className="w-16 text-center text-xs text-gray-600">
                {item.unitPrice.toFixed(2)} GNF
              </div>
              <div className="w-20 text-right text-xs text-gray-600">
                {item.total.toFixed(2)} GNF
              </div>
            </div>
          ))}
          
          {/* Subtotal Row dans le tableau */}
          <div className="flex py-3 px-4 bg-gray-100">
            <div className="flex-1"></div>
            <div className="w-60 flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Sous-total</span>
              <span className="text-gray-800">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items List - Version Mobile */}
      <div className="block md:hidden mb-6 sm:mb-8">
        <div className="bg-teal-600 text-white px-4 py-3">
          <h3 className="text-sm font-medium">ARTICLES</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {invoiceData.items.map((item, index) => (
            <div key={item.id} className="px-4 py-4 text-sm bg-white">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-800 flex-1 break-words mr-2">
                  <span className="text-xs text-gray-500 mr-2">#{String(index + 1).padStart(2, '0')}</span>
                  {item.description || `Article ${index + 1}`}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Qté:</span> {item.quantity}
                </div>
                <div>
                  <span className="font-medium">Prix:</span> {item.unitPrice.toFixed(2)} GNF
                </div>
                <div className="text-right">
                  <span className="font-medium">Total:</span> {item.total.toFixed(2)} GNF
                </div>
              </div>
            </div>
          ))}
          
          {/* Subtotal pour mobile */}
          <div className="px-4 py-3 bg-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Sous-total</span>
              <span className="text-gray-800">{invoiceData.subtotal.toFixed(2)} GNF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Totals Section - Responsive */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-center md:justify-end md:mr-8">
          <div className="w-full max-w-sm md:w-auto">
            <div className="flex flex-col sm:flex-row">
              {/* Subtotal */}
              <div className="bg-gray-100 p-3 sm:p-4 flex-1">
                <div className="text-sm font-semibold text-gray-700 mb-1">Sous-total</div>
                <div className="text-base sm:text-lg text-gray-800">{invoiceData.subtotal.toFixed(2)} GNF</div>
              </div> 
              
              {/* Tax */}
              {invoiceData.includeTax && (
                <div className="bg-gray-200 p-3 sm:p-4 flex-1">
                  <div className="text-sm font-semibold text-gray-700 mb-1">TVA (18%):</div>
                  <div className="text-base sm:text-lg text-gray-800">{invoiceData.tax.toFixed(2)} GNF</div>
                </div>
              )}
              
              {/* Total */}
              <div className="bg-slate-700 p-3 sm:p-4 text-white flex-1">
                <div className="text-sm font-semibold mb-1">Total</div>
                <div className="text-base sm:text-lg font-bold">{invoiceData.total.toFixed(2)} GNF</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You */}
      <div className="text-center md:text-right mb-6 sm:mb-8 md:mr-8">
        <div className="text-base sm:text-lg font-light text-gray-700 mb-1">Merci</div>
        <div className="text-sm text-gray-600">pour votre confiance</div>
      </div>

      {/* Footer - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Notes */}
        {invoiceData.notes && (
          <div className="px-2 sm:px-4 lg:px-8">
            <div className="mb-4">
              <div className="text-lg sm:text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: 'cursive' }}>Note</div>
              <p className="text-xs text-gray-600 leading-relaxed break-words">
                {invoiceData.notes}
              </p>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="px-2 sm:px-4 lg:px-8">
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-700 mb-2">Contact</div>
            <div className="text-xs text-gray-600 leading-relaxed space-y-1">
              <div className="break-words">Phone : +62 000 000 000 000</div>
              <div className="break-words">Email : Company@company.com</div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="px-2 sm:px-4">
          <div className="text-xs font-semibold text-gray-700 mb-2">Personne en charge</div>
          <div className="mb-4">
            <div className="text-xl sm:text-2xl text-gray-700 mb-2" style={{ fontFamily: 'cursive' }}>
              Signature
            </div>
            <div className="text-xs text-gray-600">Nom</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

const renderTemplate = (templateId: TemplateId, invoiceData: InvoiceData) => {
  switch (templateId) {
    case 'classic':
      return <ClassicTemplate invoiceData={invoiceData} />
    case 'modern':
      return <ModernTemplate invoiceData={invoiceData} />
    case 'minimal':
      return <MinimalTemplate invoiceData={invoiceData} />
    case 'corporate':
      return <CorporateTemplate invoiceData={invoiceData} />
    case 'elegant':
      return <ElegantTemplate invoiceData={invoiceData} />
    case 'colorful':
      return <ColorfulTemplate invoiceData={invoiceData} />
    case 'dark':
      return <DarkTemplate invoiceData={invoiceData} />
    case 'vintage':
      return <VintageTemplate invoiceData={invoiceData} />
    case 'tech':
      return <TechTemplate invoiceData={invoiceData} />
    case 'creative':
      return <CreativeTemplate invoiceData={invoiceData} />
    case 'luxury':
      return <LuxuryTemplate invoiceData={invoiceData} />
    case 'nature':
      return <NatureTemplate invoiceData={invoiceData} />
    case 'futuristic':
      return <FuturisticTemplate invoiceData={invoiceData} />
    case 'artistic':
      return <ArtisticTemplate invoiceData={invoiceData} />
    default:
      return <ClassicTemplate invoiceData={invoiceData} />
  }
}

// Fonction pour capturer la facture en image
const captureInvoiceAsImage = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Créer un élément temporaire pour capturer la facture
    const invoiceElement = document.querySelector('[data-invoice-content]') as HTMLElement
    if (!invoiceElement) {
      reject(new Error('Élément de facture non trouvé'))
      return
    }

    // Utiliser html2canvas pour capturer l'élément
    import('html2canvas').then((html2canvas) => {
      html2canvas.default(invoiceElement, {
        background: '#ffffff',
        useCORS: true,
        allowTaint: true,
        width: invoiceElement.scrollWidth,
        height: invoiceElement.scrollHeight
      }).then((canvas) => {
        const imageDataUrl = canvas.toDataURL('image/png')
        resolve(imageDataUrl)
      }).catch(reject)
    }).catch(() => {
      // Fallback si html2canvas n'est pas disponible
      reject(new Error('html2canvas non disponible'))
    })
  })
}

// Fonction pour télécharger une image
const downloadImage = (imageDataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = imageDataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


export function ModalPreview({ isOpen, onClose, invoiceData }: ModalPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic')

  if (!invoiceData) return null

  const handleShareWhatsApp = async () => {
    try {
      // Capturer la facture en image
      const invoiceImage = await captureInvoiceAsImage()
      
      // Créer un message avec l'image
      const message = `Bonjour ${invoiceData.clientName},\n\nVeuillez trouver ci-joint votre facture n°${invoiceData.invoiceNumber} d'un montant de ${invoiceData.total.toFixed(2)} GNF.\n\nMerci pour votre confiance !\n\nCordialement,\nL'équipe Facturly`
      
      // Pour WhatsApp, on ne peut pas envoyer d'image directement via URL
      // On va ouvrir WhatsApp avec le message et l'utilisateur pourra ajouter l'image manuellement
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message + '\n\n[Image de la facture à ajouter]')}`
      window.open(whatsappUrl, '_blank')
      
      // Télécharger automatiquement l'image pour que l'utilisateur puisse l'ajouter
      downloadImage(invoiceImage, `facture-${invoiceData.invoiceNumber}.png`)
    } catch (error) {
      console.error('Erreur lors de la génération de l\'image:', error)
      // Fallback vers le message texte
      const message = `Bonjour ${invoiceData.clientName},\n\nVeuillez trouver ci-joint votre facture n°${invoiceData.invoiceNumber} d'un montant de ${invoiceData.total.toFixed(2)} GNF.\n\nMerci pour votre confiance !\n\nCordialement,\nL'équipe Facturly`
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }
  
  const handleShareEmail = async () => {
    try {
      // Capturer la facture en image
      const invoiceImage = await captureInvoiceAsImage()
      
      const subject = `Facture n°${invoiceData.invoiceNumber} - ${invoiceData.clientName}`
      const body = `Bonjour ${invoiceData.clientName},\n\nVeuillez trouver ci-joint votre facture n°${invoiceData.invoiceNumber}.\n\nDétails de la facture :\n- Date d'émission : ${new Date(invoiceData.issueDate).toLocaleDateString('fr-FR')}\n- Date d'échéance : ${new Date(invoiceData.dueDate).toLocaleDateString('fr-FR')}\n- Montant total : ${invoiceData.total.toFixed(2)} GNF\n\nMerci pour votre confiance !\n\nCordialement,\nL'équipe Facturly`
      
      // Télécharger l'image de la facture
      downloadImage(invoiceImage, `facture-${invoiceData.invoiceNumber}.png`)
      
      // Ouvrir l'email avec le message
      const mailtoUrl = `mailto:${invoiceData.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\n[Image de la facture téléchargée]')}`
      window.location.href = mailtoUrl
    } catch (error) {
      console.error('Erreur lors de la génération de l\'image:', error)
      // Fallback vers le message texte
      const subject = `Facture n°${invoiceData.invoiceNumber} - ${invoiceData.clientName}`
      const body = `Bonjour ${invoiceData.clientName},\n\nVeuillez trouver ci-joint votre facture n°${invoiceData.invoiceNumber}.\n\nDétails de la facture :\n- Date d'émission : ${new Date(invoiceData.issueDate).toLocaleDateString('fr-FR')}\n- Date d'échéance : ${new Date(invoiceData.dueDate).toLocaleDateString('fr-FR')}\n- Montant total : ${invoiceData.total.toFixed(2)} GNF\n\nMerci pour votre confiance !\n\nCordialement,\nL'équipe Facturly`
      
      const mailtoUrl = `mailto:${invoiceData.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoUrl
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    console.log('Téléchargement PDF en cours...')
    alert('Fonctionnalité de téléchargement PDF en cours de développement')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[98vw] sm:w-[95vw] max-w-6xl h-[98vh] sm:h-[95vh] max-h-[98vh] sm:max-h-[95vh] overflow-y-auto p-1 sm:p-2 md:p-4 lg:p-6">
        <DialogHeader className="pb-1 sm:pb-2">
          <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <span className="text-base sm:text-lg md:text-xl">Aperçu de la Facture</span>
            <div className="flex gap-1 sm:gap-2 flex-wrap w-full sm:w-auto">
              <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="text-xs sm:text-sm px-2 sm:px-3 flex-1 sm:flex-none">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs sm:text-sm px-2 sm:px-3 flex-1 sm:flex-none">
                <Printer className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Imprimer</span>
                <span className="sm:hidden">Print</span>
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Sélecteur de template avec aperçu */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-1 sm:gap-2">
              <Palette className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-600" />
              <span className="hidden sm:inline">Choisir un template</span>
              <span className="sm:hidden">Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md flex-1 min-w-[100px] max-w-[120px] sm:min-w-[140px] sm:max-w-[160px] ${
                    selectedTemplate === template.id
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="p-1.5 sm:p-2">
                    <div className="text-center mb-1">
                      <span className="text-lg sm:text-xl">{template.preview}</span>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-[10px] sm:text-xs text-gray-900">{template.name}</div>
                      <div className="text-[8px] sm:text-[10px] text-gray-500 mt-1 leading-tight hidden sm:block">{template.description}</div>
                    </div>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section de partage */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-1 sm:gap-2">
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
              <span className="hidden sm:inline">Partager la facture</span>
              <span className="sm:hidden">Partager</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 md:gap-3">
              <Button 
                onClick={handleShareWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4"
                size="sm"
              >
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </Button>
              <Button 
                onClick={handleShareEmail}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4"
                size="sm"
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Email</span>
                <span className="sm:hidden">Email</span>
              </Button>
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1.5 sm:mt-2 hidden sm:block">
              Envoyez directement la facture à votre client via WhatsApp ou Email
            </p>
          </CardContent>
        </Card>

        {/* Rendu du template sélectionné */}
        <div data-invoice-content>
          {renderTemplate(selectedTemplate, invoiceData)}
        </div>
      </DialogContent>
    </Dialog>
  )
}