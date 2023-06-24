const db = require('../util/database');

class Beneficiary{
    constructor(formdata){
        
    }

    static getAll(by, sortIn){
        if(!sortIn && !by){
            return db.execute("SELECT * FROM beneficiary WHERE main_beneficiary = 'YES' ORDER BY interview_date DESC");
        }else{
            const q = `SELECT * FROM beneficiary WHERE main_beneficiary = 'YES' ORDER BY ${by} ${sortIn}`
            return db.execute(q);
        }
    }
    static getClosed(by, sortIn){
        if(!sortIn && !by){
            return db.execute("SELECT * FROM beneficiary WHERE main_beneficiary = 'YES' AND decision_closure_date IS NOT NULL ORDER BY interview_date DESC");
        }else{
            const q = `SELECT * FROM beneficiary WHERE main_beneficiary = 'YES' AND decision_closure_date IS NOT NULL ORDER BY ${by} ${sortIn}`;
            return db.execute(q);
        }
    }
    static getCurrent(by, sortIn){
        if(!sortIn && !by){
            return db.execute("SELECT * FROM beneficiary WHERE main_beneficiary = 'YES' AND decision_closure_date IS NULL ORDER BY interview_date DESC");
        }else{
            const q = `SELECT * FROM beneficiary WHERE main_beneficiary = 'YES' AND decision_closure_date IS NULL ORDER BY ${by} ${sortIn}`;
            return db.execute(q);
        }
    }
    
    static close(b_id,close_date, closure_reason){
        return db.execute("UPDATE beneficiary SET decision_closure_date = ?, decision_closure_reason = ? WHERE b_id = ?", [close_date, closure_reason, b_id]);
    }

    static search(search, by, sortIn){
        if(!by && !sortIn){
            const q = 'SELECT * FROM beneficiary WHERE (main_beneficiary = "YES") AND (first_name LIKE ? OR last_name LIKE ?)';
            const searchValue = `%${search}%`;
            return  db.execute(q,[searchValue,searchValue]);
        }else{
            const q = `SELECT * FROM beneficiary WHERE (main_beneficiary = "YES") AND (first_name LIKE ? OR last_name LIKE ?) ORDER BY ${by} ${sortIn}`;
            const searchValue = `%${search}%`;
            return  db.execute(q,[searchValue,searchValue]);
        }
    }

    static getAllBeneficiariesData(beneficiary_ids){
        const beneficiaries = [];
        if(!beneficiary_ids){
            const q = `SELECT
            main_beneficiary.b_id,
            CONCAT(main_beneficiary.first_name, ' ', main_beneficiary.middle_name, ' ', main_beneficiary.last_name) AS main_beneficiary_full_name,
            main_beneficiary.phone_number AS main_beneficiary_phone_number,
            main_beneficiary.birth_date AS main_beneficiary_birth_date,
            main_beneficiary.number_of_children AS main_beneficiary_number_of_children,
            main_beneficiary.job_desc AS main_beneficiary_job_desc,
            main_beneficiary.job_salary AS main_beneficiary_job_salary,
            main_beneficiary.neighborhood_address AS main_beneficiary_neighborhood_address,
            main_beneficiary.house_address AS main_beneficiary_house_address,
            main_beneficiary.house_floor AS main_beneficiary_house_floor,
            main_beneficiary.address_details AS main_beneficiary_address_details,
            main_beneficiary.price_of_rent AS main_beneficiary_price_of_rent,
            main_beneficiary.interview_date AS main_beneficiary_interview_date,
            main_beneficiary.interview_location AS main_beneficiary_interview_location,
            main_beneficiary.decision_closure_date AS main_beneficiary_decision_closure_date,
            family_situation.situation_desc AS main_beneficiary_family_situation,
            sector.sector_type AS main_beneficiary_sector_type,
            professional_status.p_desc AS main_beneficiary_professional_status,
            users.user_name AS main_beneficiary_interviewer,
            health_social_service.hss_desc AS main_beneficiary_health_social_service,
            property_status.status_desc AS main_beneficiary_property_status,
            financial_situation.*
          FROM
            beneficiary AS main_beneficiary
          LEFT JOIN
            family_situation ON main_beneficiary.family_situation_id = family_situation.situation_id
          LEFT JOIN
            sector ON main_beneficiary.sector_id = sector.sector_id
          LEFT JOIN
            professional_status ON main_beneficiary.professional_status_id = professional_status.p_id
          LEFT JOIN
            users ON main_beneficiary.interviewer_id = users.user_id
          LEFT JOIN
            health_social_services AS health_social_service ON main_beneficiary.hss_id = health_social_service.hss_id
          LEFT JOIN
            property_status ON main_beneficiary.property_status_id = property_status.status_id
          LEFT JOIN
            financial_situation ON main_beneficiary.financial_situation_id = financial_situation.f_id
          WHERE
            main_beneficiary.main_beneficiary = "YES" AND decision_closure_date IS NULL
          ORDER BY
            main_beneficiary.interview_date;
          `;
            return db.execute(q);
        }
        const promise = beneficiary_ids.map(id=>{
            const q = `SELECT
            main_beneficiary.b_id,
            CONCAT(main_beneficiary.first_name, ' ', main_beneficiary.middle_name, ' ', main_beneficiary.last_name) AS main_beneficiary_full_name,
            main_beneficiary.phone_number AS main_beneficiary_phone_number,
            main_beneficiary.birth_date AS main_beneficiary_birth_date,
            main_beneficiary.number_of_children AS main_beneficiary_number_of_children,
            main_beneficiary.job_desc AS main_beneficiary_job_desc,
            main_beneficiary.job_salary AS main_beneficiary_job_salary,
            main_beneficiary.neighborhood_address AS main_beneficiary_neighborhood_address,
            main_beneficiary.house_address AS main_beneficiary_house_address,
            main_beneficiary.house_floor AS main_beneficiary_house_floor,
            main_beneficiary.address_details AS main_beneficiary_address_details,
            main_beneficiary.price_of_rent AS main_beneficiary_price_of_rent,
            main_beneficiary.interview_date AS main_beneficiary_interview_date,
            main_beneficiary.interview_location AS main_beneficiary_interview_location,
            main_beneficiary.decision_closure_date AS main_beneficiary_decision_closure_date,
            family_situation.situation_desc AS main_beneficiary_family_situation,
            sector.sector_type AS main_beneficiary_sector_type,
            professional_status.p_desc AS main_beneficiary_professional_status,
            users.user_name AS main_beneficiary_interviewer,
            health_social_service.hss_desc AS main_beneficiary_health_social_service,
            property_status.status_desc AS main_beneficiary_property_status,
            financial_situation.*
          FROM
            beneficiary AS main_beneficiary
          LEFT JOIN
            family_situation ON main_beneficiary.family_situation_id = family_situation.situation_id
          LEFT JOIN
            sector ON main_beneficiary.sector_id = sector.sector_id
          LEFT JOIN
            professional_status ON main_beneficiary.professional_status_id = professional_status.p_id
          LEFT JOIN
            users ON main_beneficiary.interviewer_id = users.user_id
          LEFT JOIN
            health_social_services AS health_social_service ON main_beneficiary.hss_id = health_social_service.hss_id
          LEFT JOIN
            property_status ON main_beneficiary.property_status_id = property_status.status_id
          LEFT JOIN
            financial_situation ON main_beneficiary.financial_situation_id = financial_situation.f_id
          WHERE
            main_beneficiary.main_beneficiary = "YES" AND main_beneficiary.b_id = ?
          ORDER BY
            main_beneficiary.b_id;
          `;
          return db.execute(q, [id])
          .then(([result]) => {
            beneficiaries.push(result[0]);
          }).catch(err=>{
            console.log(err);
          });

        });

        return Promise.all(promise)
        .then(()=>{
            return beneficiaries;
        })
        .catch(err=>{
            console.log(err);
        })

    }

    static getRealtedBeneficiaries(b_id){
        const q = `SELECT
        br.relation_desc,
        CONCAT(
            b2.first_name,
            ' ',
            b2.middle_name,
            ' ',
            b2.last_name
        ) AS Beneficiary_Name,
        b2.birth_date,
        b2.phone_number,
        prof_status.p_desc,
        b2.job_desc,
        b2.job_address,
        b2.job_salary,
        b2.job_remark,
        s.sector_type,
        hss.hss_desc
    FROM
        beneficiar_relation br
    JOIN
        beneficiary b2 ON br.beneficiary2_id = b2.b_id
    LEFT JOIN
        professional_status prof_status ON b2.professional_status_id = prof_status.p_id
    LEFT JOIN
        sector s ON b2.sector_id = s.sector_id
    LEFT JOIN
        health_social_services hss ON b2.hss_id = hss.hss_id
    WHERE
        br.beneficiary1_id = ?;
    `;
    return db.execute(q,[b_id]);
    }

    static getBeneficiariesAddress(){
        const q = `SELECT CONCAT(first_name," ", middle_name," ", last_name) as main_full_name,
         neighborhood_address, street_address, house_address, house_floor, address_details 
         FROM beneficiary WHERE main_beneficiary ="YES" AND decision_closure_date IS NULL`;
        return db.execute(q);
    }

    static getBeneficiariesHealth(){
        const q = `
        SELECT CONCAT(b.first_name, " ", b.middle_name, " ", b.last_name) AS beneficiary_full_name,
          medication.medicine_name,
          disease.disease_name,
          health_situation.bought,
          health_situation.start_date,
          health_situation.end_date,
          health_situation.remark
        FROM beneficiary as b JOIN health_situation JOIN medication JOIN disease
        WHERE health_situation.beneficiary_id = b.b_id AND b.decision_closure_date IS NULL
        `;
        return db.execute(q);
    }

}

const pool = require('../util/database');

function selectAllAvailableFamilies(){
    const query = "SELECT b_id, first_name, middle_name, last_name FROM beneficiary WHERE main_beneficiary = 'yes' AND decision_closure_date IS NULL;";
    
    return pool.execute(query)
}

module.exports= {
    selectAllAvailableFamilies,
    Beneficiary
}







// SELECT
//   main_beneficiary.first_name AS main_beneficiary_first_name,
//   main_beneficiary.middle_name AS main_beneficiary_middle_name,
//   main_beneficiary.last_name AS main_beneficiary_last_name,
//   main_beneficiary.phone_number AS main_beneficiary_phone_number,
//   main_beneficiary.birth_date AS main_beneficiary_birth_date,
//   main_beneficiary.number_of_children AS main_beneficiary_number_of_children,
//   main_beneficiary.job_desc AS main_beneficiary_job_desc,
//   main_beneficiary.job_salary AS main_beneficiary_job_salary,
//   main_beneficiary.neighborhood_address AS main_beneficiary_neighborhood_address,
//   main_beneficiary.house_address AS main_beneficiary_house_address,
//   main_beneficiary.house_floor AS main_beneficiary_house_floor,
//   main_beneficiary.address_details AS main_beneficiary_address_details,
//   main_beneficiary.price_of_rent AS main_beneficiary_price_of_rent,
//   main_beneficiary.interview_date AS main_beneficiary_interview_date,
//   main_beneficiary.interview_location AS main_beneficiary_interview_location,
//   main_beneficiary.decision_closure_date AS main_beneficiary_decision_closure_date,
//   family_situation.situation_desc AS main_beneficiary_family_situation,
//   sector.sector_type AS main_beneficiary_sector_type,
//   professional_status.p_desc AS main_beneficiary_professional_status,
//   users.user_name AS main_beneficiary_interviewer,
//   health_social_service.hss_desc AS main_beneficiary_health_social_service,
//   property_status.status_desc AS main_beneficiary_property_status,
//   financial_situation.*,
//   child.first_name AS child_first_name,
//   child.birth_date AS child_birth_date,
//   GROUP_CONCAT(DISTINCT child_health_situation.remark SEPARATOR ', ') AS child_health_situations,
//   wife.first_name AS wife_first_name,
//   wife.middle_name AS wife_middle_name,
//   wife.last_name AS wife_last_name,
//   related.first_name AS related_first_name,
//   related.middle_name AS related_middle_name,
//   related.last_name AS related_last_name
// FROM
//   beneficiary AS main_beneficiary
// LEFT JOIN
//   family_situation ON main_beneficiary.family_situation_id = family_situation.situation_id
// LEFT JOIN
//   sector ON main_beneficiary.sector_id = sector.sector_id
// LEFT JOIN
//   professional_status ON main_beneficiary.professional_status_id = professional_status.p_id
// LEFT JOIN
//   users ON main_beneficiary.interviewer_id = users.user_id
// LEFT JOIN
//   health_social_services AS health_social_service ON main_beneficiary.hss_id = health_social_service.hss_id
// LEFT JOIN
//   property_status ON main_beneficiary.property_status_id = property_status.status_id
// LEFT JOIN
//   financial_situation ON main_beneficiary.financial_situation_id = financial_situation.f_id
// LEFT JOIN
//   beneficiar_relation AS child_relation ON main_beneficiary.b_id = child_relation.beneficiary1_id AND child_relation.relation_desc = 'Child'
// LEFT JOIN
//   beneficiary AS child ON child_relation.beneficiary2_id = child.b_id
// LEFT JOIN
//   health_situation AS child_health_situation ON child.b_id = child_health_situation.beneficiary_id
// LEFT JOIN
//   beneficiar_relation AS wife_relation ON main_beneficiary.b_id = wife_relation.beneficiary1_id AND wife_relation.relation_desc = 'Wife'
// LEFT JOIN
//   beneficiary AS wife ON wife_relation.beneficiary2_id = wife.b_id
// LEFT JOIN
//   beneficiar_relation AS related_relation ON main_beneficiary.b_id = related_relation.beneficiary1_id AND related_relation.relation_desc <> 'Child' AND related_relation.relation_desc <> 'Wife'
// LEFT JOIN
//   beneficiary AS related ON related_relation.beneficiary2_id = related.b_id
// GROUP BY
//   main_beneficiary.b_id
// ORDER BY
//   main_beneficiary.b_id;
