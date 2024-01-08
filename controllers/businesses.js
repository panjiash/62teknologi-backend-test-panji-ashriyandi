import db from "../config/db.js";
import { generateId } from "../utils/functions.js";
import path from "path";
import fs from "fs";

export const getAllBusiness = async (req, res) => {
  try {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const offset = limit * page;

    const search = req.query.search || "";
    const [data] = await db.query(
      `SELECT * FROM business WHERE name LIKE '%${search}%' OR categories LIKE '%${search}%' OR latitude LIKE '%${search}%' OR longitude LIKE '%${search}%' OR city LIKE '%${search}%' limit ${offset},${limit}`
    );

    const [dataLength] = await db.query(
      `SELECT count(*) totaldata FROM business WHERE name LIKE '%${search}%' OR categories LIKE '%${search}%' OR latitude LIKE '%${search}%' OR longitude LIKE '%${search}%' OR city LIKE '%${search}%'`
    );

    const totalRows = parseInt(dataLength.map((data) => data.totaldata));
    const totalPage = Math.ceil(totalRows / limit);

    let businesses = [];
    data.map((dat) => {
      businesses.push({
        id: dat.id,
        alias: dat.alias,
        name: dat.name,
        image_url: dat.image_url,
        is_closed: dat.is_closed === 0 ? false : true,
        url: dat.url,
        review_count: dat.review_count,
        categories: JSON.parse(dat.categories),
        rating: dat.rating,
        coordinates: {
          latitude: parseFloat(dat.latitude),
          longitude: parseFloat(dat.longitude),
        },
        transactions: JSON.parse(dat.transactions),
        price: dat.price,
        location: {
          address1: dat.address1,
          address2: dat.address2,
          address3: dat.address3,
          city: dat.city,
          zip_code: dat.zip_code,
          country: dat.country,
          state: dat.state,
          display_address: [
            `${dat.address1 ? dat.address1 : ""}${
              dat.address2 ? " " + dat.address2 : ""
            }${dat.address3 ? " " + dat.address3 : ""}`,
            `${dat.city}, ${dat.state} ${dat.zip_code}`,
          ],
        },
        phone: dat.phone,
        display_phone: dat.display_phone,
        distance: dat.distance,
      });
    });
    res.status(200).json({
      status: 1,
      page,
      limit,
      totalRows,
      totalPage,
      businesses,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postBusiness = async (req, res) => {
  try {
    const id = generateId();
    const name = req.body.name || "";
    const is_closed = req.body.is_closed || "";
    const url = req.body.url || "";
    const review_count = req.body.review_count || "";
    const categories = req.body.categories || "";
    const rating = req.body.rating || "";
    const latitude = req.body.latitude || "";
    const longitude = req.body.longitude || "";
    const transactions = req.body.transactions || "";
    const price = req.body.price || "";
    const address1 = req.body.address1 || "";
    const address2 = req.body.address2 || "";
    const address3 = req.body.address3 || "";
    const city = req.body.city || "";
    const zip_code = req.body.zip_code || "";
    const country = req.body.country || "";
    const state = req.body.state || "";
    const phone = req.body.phone || "";
    const display_phone = req.body.display_phone || "";
    const distance = req.body.distance || "";
    if (!name) {
      res.json({
        status: 0,
        msg: "Name is null",
        data: [],
      });
    } else {
      const [cekName] = await db.query(
        `SELECT name FROM business WHERE name = '${name}'`
      );
      if (cekName.length) {
        res.json({
          status: 0,
          msg: "Name is already exist!",
          data: [],
        });
      } else {
        const [cekAlias] = await db.query(
          `SELECT alias FROM business WHERE name = '${name}'`
        );
        let alias;
        if (cekAlias.length) {
          alias =
            name.toLowerCase().replace(/\s+/g, "-") +
            "-" +
            parseInt(cekAlias.length + 1);
        } else {
          alias = name.toLowerCase().replace(/\s+/g, "-");
        }

        const fileUploads = req?.files?.file || "";
        let fileName;
        if (fileUploads === "") {
          fileName = "";
        } else {
          const file = req.files.file;
          const ext = path.extname(file.name);
          fileName = "http://localhost:5000/img/" + Date.now() + ext;
          file.mv(`./public/img/${Date.now() + ext}`, async (err) => {
            if (err) throw err;
          });
        }

        await db.query(
          `INSERT INTO business VALUES ('${id}','${alias}','${name}','${fileName}','${is_closed}','${url}','${review_count}','${categories}','${rating}','${latitude}','${longitude}','${transactions}','${price}','${address1}','${address2}','${address3}','${city}','${zip_code}','${country}','${state}','${phone}','${display_phone}','${distance}')`
        );
        res.json({
          status: 1,
          msg: "Data has been saved!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 0,
        msg: "ID required",
        data: [],
      });
    } else {
      const id = req.params.id;
      const name = req.body.name || "";
      const is_closed = req.body.is_closed || "";
      const url = req.body.url || "";
      const review_count = req.body.review_count || "";
      const categories = req.body.categories || "";
      const rating = req.body.rating || "";
      const latitude = req.body.latitude || "";
      const longitude = req.body.longitude || "";
      const transactions = req.body.transactions || "";
      const price = req.body.price || "";
      const address1 = req.body.address1 || "";
      const address2 = req.body.address2 || "";
      const address3 = req.body.address3 || "";
      const city = req.body.city || "";
      const zip_code = req.body.zip_code || "";
      const country = req.body.country || "";
      const state = req.body.state || "";
      const phone = req.body.phone || "";
      const display_phone = req.body.display_phone || "";
      const distance = req.body.distance || "";
      const [cekParam] = await db.query(
        `SELECT id FROM business WHERE id = '${id}'`
      );
      if (!cekParam.length) {
        res.json({
          status: 0,
          msg: "params not found",
          data: [],
        });
      } else {
        if (!name) {
          res.json({
            status: 0,
            msg: "Name is null",
            data: [],
          });
        } else {
          const [cekName] = await db.query(
            `SELECT name FROM business WHERE name = '${name}' AND id != '${id}'`
          );
          if (cekName.length) {
            res.json({
              status: 0,
              msg: "Name is already exist!",
              data: [],
            });
          } else {
            const [cekAlias] = await db.query(
              `SELECT alias FROM business WHERE name = '${name}'`
            );
            let alias;
            if (cekAlias.length) {
              alias =
                name.toLowerCase().replace(/\s+/g, "-") +
                "-" +
                parseInt(cekAlias.length + 1);
            } else {
              alias = name.toLowerCase().replace(/\s+/g, "-");
            }

            await db.query(
              `UPDATE business SET alias = '${alias}',name = '${name}', is_closed = '${is_closed}',url = '${url}',review_count = '${review_count}',categories = '${categories}',rating = '${rating}',latitude = '${latitude}',longitude = '${longitude}',transactions = '${transactions}',price = '${price}',address1 = '${address1}',address2 = '${address2}',address3 = '${address3}',city = '${city}',zip_code = '${zip_code}',country = '${country}',state = '${state}',phone = '${phone}',display_phone = '${display_phone}',distance = '${distance}' WHERE id = '${id}'`
            );
            res.json({
              status: 1,
              msg: "updated success",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({ status: 0, msg: "id required" });
    } else {
      const id = req.params.id;
      const [cekId] = await db.query(
        `SELECT id FROM business WHERE id = '${id}'`
      );
      if (!cekId.length) {
        res.json({
          status: 0,
          msg: "id not found",
        });
      } else {
        const [cekImage] = await db.query(
          `SELECT image_url FROM business WHERE id = '${req.params.id}'`
        );
        const image = cekImage[0].image_url.replace(
          "http://localhost:5000/img/",
          ""
        );
        if (image !== "") {
          const filepath = `./public/img/${image}`;
          fs.unlinkSync(filepath);
        }
        await db.query(`DELETE FROM business WHERE id = '${id}'`);
        res.json({
          status: 1,
          msg: "delete success",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBusiness = async (req, res) => {
  if (!req.params.id) {
    res.json({
      status: 0,
      msg: "no data available",
      data: [],
    });
  } else {
    const id = req.params.id;
    const [data] = await db.query(`SELECT * FROM business WHERE id ='${id}'`);
    res.json(data);
  }
};
