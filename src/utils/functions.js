export function groupByTipoArchivo(array, key) {
    const groupBy = array.reduce((group, product) => {
        const { tipoArchivo } = product;
        group[tipoArchivo] = group[tipoArchivo] ?? [];
        group[tipoArchivo].push(product);
        return group;
    }, {});


    return groupBy
}

export function checkVarible(variable) {
    if (variable === undefined || variable === null) {
        return false;
    }
    return true
}



export const procesarEstadoDocs = (usuario, documentos) => {

    if (checkVarible(documentos) && checkVarible(usuario)) {
        let groupDocs = groupByTipoArchivo(documentos, "tipoArchivo")
        let setDocsUser = null;
        let documentosUsuario;

        if (usuario.length !== 0) {
            documentosUsuario = usuario.requisito;

            setDocsUser = new Set(documentosUsuario.map(obj => obj._id));

        }
        let arrayDocs = tipoDocuemntos.map(item => {
            let mappingDocs = groupDocs[item.key]?.map(doc => {
                let filterDocs
                let disponible = setDocsUser.has(doc._id)
                if (usuario.length !== 0) {
                    filterDocs = documentosUsuario.find(item => item._id === doc._id)
                }

                return {
                    documento: disponible ? filterDocs.documento : null,
                    tipoDocumento: doc,
                    fechaVencimiento: disponible ? new Date(filterDocs.fechaVencimiento) : null,
                    disponible: disponible,
                    nombre: doc.nombre,
                    puedeVencer: doc.puedeVencer
                }
            })
            return {
                tipoArchivo:
                {
                    nombre: item.nombre,
                    hash: `#${item.key}`,
                    documentos: typeof mappingDocs !== 'undefined' ? mappingDocs : []
                },

            }
        })


        return arrayDocs
    }
    return null
}

export const calcularEstado = (docs) => {
    let cant = 0;
    let cantComplete = 0;
    docs.map(doc => {
        doc.tipoArchivo.documentos.map(requisito => {
            cant += 1
            if (requisito.disponible) {
                cantComplete += 1;
            }
            // eslint-disable-next-line array-callback-return
            return;
        })
        // eslint-disable-next-line array-callback-return
        return;
    })
    return (cantComplete / cant)

}

export const calcularTotaVerificados = (listado_p) => {
    let totalVerificados = 0
    if (checkVarible(listado_p)) {
        listado_p.map((element) => {
            if (element.perPerfilCompletado === 1) {
                totalVerificados += 1
            }
        })
    }
    return totalVerificados;
}
export const tipoDocuemntos = [
    { key: 'documentos', nombre: "Documentos" },
    { key: 'licencia', nombre: "Licencias" },
    { key: 'examenes', nombre: "Exámenes" },
    { key: 'epp', nombre: "Epp" },
    { key: 'curso_capacitacion', nombre: "Curso y Capacitaciones" },
    { key: 'otros', nombre: "Otros" },
]

