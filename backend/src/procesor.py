import pdfplumber
import re

path = "/SKill gap/backend/data/job_descriptions/Job_Description.pdf"


def extract_text(path):
    pages = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            # print(page.extract_text())
            pages.append(page.extract_text())
    return '\n'.join(pages)

# raw_text = extract_text(path)

def clean_text(raw_text):
    raw_text = raw_text.replace("\uf0b7", "")
    raw_text = raw_text.replace("•", "")
    raw_text = raw_text.replace(",", "")
    raw_text = raw_text.replace("\t", "")
    raw_text = raw_text.replace("\x00", "")
    raw_text = re.sub(r' +', ' ', raw_text)
    raw_text = re.sub(r'\n{3,}', '\n\n', raw_text)

    raw_text = raw_text.strip()

    return raw_text



if __name__ == "__main__":
    raw = extract_text(path)
    cleaned = clean_text(raw)
    print(cleaned)