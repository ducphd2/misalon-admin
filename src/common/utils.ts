export const validateName = (str: string) => {
  var re =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/gm;
  return re.test(str);
};

export const childrenNum = (str: string) => {
  var re = /(^[0-9])\b/;
  return re.test(str);
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isVietnamesePhoneNumber = (str: string) => {
  const regex = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
  if (regex.test(str)) {
    return true;
  }
  return false;
};

export const groupByKey = (array: any[], key: any) =>
  array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});

export const removeTagHTML = (string: string) => {
  if (string && string !== "") {
    const string1 = string.replace(/(<([^>]+)>)/gi, "");
    const string2 = string1.replace(/&nbsp/g, "");
    const string3 = string2.replace(/;/g, "");
    const string4 = string3.replace(/\[[^\]]*?\]/g, "");
    return string4;
  }
  return "";
};

export const validatePassword = (password: string) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,16}$/;
  return re.test(String(password));
};

export const getBranchType = (skills: any) => {
  const obj = {} as any;
  const result: string[] = [];
  let arr = [];
  for (let i = 0; i < skills.length; i++) {
    obj[skills[i].type] = obj[skills[i].type]
      ? [...obj[skills[i].type], skills[i]]
      : [...result, skills[i]];
  }
  for (const key in obj) {
    arr.push({
      name: key,
      value: obj[key],
    });
  }
  return arr;
};

interface ChartData {
  name: string;
  value: number;
  color: string;
}

export const conversesChartData = (
  arr: any,
  color: string = "#000000"
): ChartData[] => {
  return arr.map((el: any) => ({
    name: el?.skillName || el?.name,
    value: el?.numberOfUsers || el?.score,
    color: el?.color || color,
  }));
};

export const getColor = (score: number) => {
  let color = "";
  switch (score) {
    case 1:
      color = "#F6ECC9";
      break;
    case 2:
      color = "#F6E39E";
      break;
    case 3:
      color = "#F8D247";
      break;
    case 4:
      color = "#B7FEE4";
      break;
    case 5:
      color = "#F6ECC9";
      break;
    case 6:
      color = "#45B68D";
      break;
    case 7:
      color = "#225945";
      break;
    case 8:
      color = "#666666";
      break;
    case 9:
      color = "#333333";
      break;
    case 10:
      color = "#181818";
      break;
    default:
      break;
  }
  return color;
};

export const conversesChartVariablepie = (arr: any) => {
  const y = Math.round(100 / arr.length);
  return arr.map((el: any) => ({
    y,
    name: el?.name,
    score: el?.score,
    color: getColor(Number(el?.score)),
  }));
};

export const getRandomColor = () => {
  let colors = ["#FC7300", "#FCE22A", "#F12D2D", "#3F52E3", "#5FD068"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const convertBranchPercentages = (arr: any) => {
  const updatedArr = arr.map((skill: any) => {
    const { fresher, junior, middle, preSenior, senior } = skill;
    const total = fresher + junior + middle + preSenior + senior;

    if (total > 0) {
      return {
        ...skill,
        fresher: Number.isInteger((fresher / total) * 100)
          ? (fresher / total) * 100
          : ((fresher / total) * 100).toFixed(2),
        junior: Number.isInteger((junior / total) * 100)
          ? (junior / total) * 100
          : ((junior / total) * 100).toFixed(2),
        middle: Number.isInteger((middle / total) * 100)
          ? (middle / total) * 100
          : ((middle / total) * 100).toFixed(2),
        preSenior: Number.isInteger((preSenior / total) * 100)
          ? (preSenior / total) * 100
          : ((preSenior / total) * 100).toFixed(2),
        senior: Number.isInteger((senior / total) * 100)
          ? (senior / total) * 100
          : ((senior / total) * 100).toFixed(2),
      };
    }
    return skill;
  });

  return updatedArr;
};
export const calculateTotalNumberOfUsers = (data: any) => {
  const totalNumberOfUsers = data.reduce(
    (accumulator: any, currentValue: any) => {
      return accumulator + currentValue.numberOfUsers;
    },
    0
  );
  return totalNumberOfUsers;
};

export const imageUpload = async (images: any) => {
  let imgArr: any = [];
  for (const item of images) {
    console.log({ item });
    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "pcfn6h3b");
    formData.append("cloud_name", "dueyjeqd5");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dueyjeqd5/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      imgArr.push({ public_id: data.public_id, url: data.secure_url } as never);
    } catch (error) {
      console.log("****************************");
      console.log(error);
    }
  }
  return imgArr;
};
