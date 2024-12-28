from bs4 import BeautifulSoup
import os
import re
import json
from datetime import datetime
from pathlib import Path


def extract_text_and_time(html_file_path):
    """Extract text and timestamps from HTML file"""
    with open(html_file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Extract title and content
    titles = [title.get_text().strip() for title in soup.find_all('title')]
    paragraphs = [p.get_text().strip() for p in soup.find_all('p')]

    # Extract timestamps
    init_time = ""
    init_time_tag = soup.find('td', {'align': 'center', 'style': 'font-size: 9pt'})
    if init_time_tag:
        init_time_match = re.search(r'\d{4}/\d{1,2}/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}', init_time_tag.get_text())
        if init_time_match:
            init_time = init_time_match.group()

    edit_time = ""
    edit_time_tag = soup.find('td', text=re.compile('本文更新于'))
    if edit_time_tag:
        edit_time_match = re.search(r'\d{4}/\d{1,2}/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}', edit_time_tag.get_text())
        if edit_time_match:
            edit_time = edit_time_match.group()

    return {
        'title': ' '.join(titles),
        'content': ' '.join(paragraphs),
        'init_time': init_time,
        'edit_time': edit_time
    }


def process_directory(input_dir):
    """Process all HTML files in a directory and its subdirectories"""
    input_path = Path(input_dir)

    # Create output structure
    output = {
        'metadata': {
            'processed_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'source_directory': str(input_path.absolute())
        },
        'documents': []
    }

    # Process all HTML files
    for html_file in input_path.rglob('*.html'):
        try:
            # Extract document ID from filename
            doc_id = html_file.stem

            # Get relative path from input directory
            rel_path = str(html_file.relative_to(input_path))

            # Extract text and timestamps
            extracted_data = extract_text_and_time(str(html_file))

            # Add to documents list
            doc_data = {
                'index': doc_id,
                'directory': rel_path,
                'title': extracted_data['title'],
                'content': extracted_data['content'],
                'create_time': extracted_data['init_time'],
                'update_time': extracted_data['init_time']
            }
            output['documents'].append(doc_data)

            print(f"Processed: {rel_path}")

        except Exception as e:
            print(f"Error processing {html_file}: {str(e)}")

    return output


def html2json(input_dir):
    """Convert HTML files to a single JSON file"""
    # Process all HTML files
    output_data = process_directory(input_dir)

    # Create output filename based on the last directory name
    input_path = Path(input_dir)
    output_filename = f"{input_path.name}_converted.json"
    output_path = input_path / output_filename

    # Save to JSON file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"\nConversion complete!")
    print(f"Total documents processed: {len(output_data['documents'])}")
    print(f"Output saved to: {output_path}")

    return output_path


if __name__ == "__main__":

    input_dir = "D:\\桌面\\temp_build\\data"
    if not os.path.isdir(input_dir):
        print(f"Error: {input_dir} is not a directory")

    html2json(input_dir)
